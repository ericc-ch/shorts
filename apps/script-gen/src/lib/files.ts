import { GEMINI_API_KEY } from "@/lib/env.ts";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export const filesManager = new GoogleAIFileManager(GEMINI_API_KEY);

export async function resetFiles() {
  const fileList = await filesManager.listFiles();

  const deletePromises =
    fileList.files?.map((file) => filesManager.deleteFile(file.name)) ?? [];

  return Promise.allSettled(deletePromises);
}

export async function uploadAudioBlob(audio: Blob) {
  // Google SDK does not support Blob
  // It only supports uploading using file path
  // So we need to write the file to disk first (Which sucks)
  const tempFile = await Deno.makeTempFile({ prefix: "fairy_audio_" });
  const arrayBuffer = await audio.arrayBuffer();
  await Deno.writeFile(tempFile, new Uint8Array(arrayBuffer));

  const response = await filesManager.uploadFile(tempFile, {
    mimeType: "audio/ogg",
  });

  await Deno.remove(tempFile);

  return response;
}

export async function uploadImage(path: string) {
  const response = await filesManager.uploadFile(path, {
    mimeType: "image/png",
  });

  return response;
}
