import { GEMINI_API_KEY } from "@/lib/env.ts";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { TempFileManager } from "common";

export const filesManager = new GoogleAIFileManager(GEMINI_API_KEY);
export const tmpFiles = new TempFileManager({
  dir: "shorts-script-gen",
});

export async function deleteUploadedFiles() {
  const fileList = await filesManager.listFiles();

  const deletePromises =
    fileList.files?.map((file) => filesManager.deleteFile(file.name)) ?? [];

  return Promise.allSettled(deletePromises);
}

export async function uploadBlob(blob: Blob, mime: string) {
  const fileName = "upload_blob";

  // Google SDK does not support Blob
  // It only supports uploading using file path
  // So we need to write the file to disk first (Which sucks)
  const file = await tmpFiles.create(fileName, blob);

  const response = await filesManager.uploadFile(file, {
    mimeType: mime,
  });

  await tmpFiles.delete(file);

  return response;
}

export async function uploadPath(path: string, mime: string) {
  const response = await filesManager.uploadFile(path, {
    mimeType: mime,
  });

  return response;
}
