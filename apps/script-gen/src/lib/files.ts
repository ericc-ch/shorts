import { GEMINI_API_KEY } from "@/lib/env.ts";
import {
  type FileMetadataResponse,
  FileState,
  GoogleAIFileManager,
} from "@google/generative-ai/server";
import { delay } from "@std/async";
import { TempFileManager } from "common";
import consola from "consola";

export const filesManager = new GoogleAIFileManager(GEMINI_API_KEY);
export const tmpFiles = new TempFileManager({
  dir: "shorts-script-gen",
});

export async function deleteUploadedFiles() {
  consola.info("Deleting all uploaded files");
  const fileList = await filesManager.listFiles();

  const deletePromises =
    fileList.files.map((file) => filesManager.deleteFile(file.name)) ?? [];

  await Promise.allSettled(deletePromises);
  consola.success("Deleted all uploaded files");
}

export async function uploadBlob(blob: Blob, mime: string) {
  consola.info(`Uploading blob: ${blob.size} bytes`);

  const fileName = "upload_blob";

  // Google SDK does not support Blob
  // It only supports uploading using file path
  // So we need to write the file to disk first (Which sucks)
  const file = await tmpFiles.create(fileName, blob);

  const response = await filesManager.uploadFile(file, {
    mimeType: mime,
  });

  await tmpFiles.delete(file);

  consola.success(`Uploaded blob: ${response.file.name}`);
  return response;
}

export async function uploadPath(path: string, mime: string) {
  consola.info(`Uploading file: ${path}`);
  const response = await filesManager.uploadFile(path, {
    mimeType: mime,
  });

  consola.success(`Uploaded file: ${response.file.name}`);
  return response;
}

export async function waitForFileActive(
  file: FileMetadataResponse,
  poll = 1000,
) {
  consola.info(`Waiting for file processing: ${file.name}`);

  let newFile = file;

  while (newFile.state === FileState.PROCESSING) {
    await delay(poll);
    newFile = await filesManager.getFile(file.name);
  }

  if (newFile.state !== FileState.ACTIVE) {
    throw Error(`Failed processing file: ${file.name}`);
  }

  consola.success(`File processed: ${file.name}`);
}
