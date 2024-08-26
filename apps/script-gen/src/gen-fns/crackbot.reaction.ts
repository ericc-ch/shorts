import type { QueueCrackBotReaction } from "api-schema/queue";

import { uploadPath, waitForFileActive } from "@/lib/files";
import { messageQueue } from "@/lib/queue";
import { crackBotReaction } from "@/services/crackbot.reaction";
import { MIME_TYPES, ytDlp } from "common";
import consola from "consola";
import { QUEUE } from "message-queue";
import { rm } from "node:fs/promises";

export async function crackbotReaction(queue: QueueCrackBotReaction) {
  consola.info(`Downloading video: ${queue.payload.backgroundVideoUrl}`);
  const videoPath = await ytDlp({ url: queue.payload.backgroundVideoUrl });

  consola.success(`Downloaded video: ${videoPath}`);

  const uploaded = await uploadPath(videoPath, MIME_TYPES.VIDEO.MP4);
  await waitForFileActive(uploaded.file);

  consola.info(`Deleting downloaded video: ${videoPath}`);
  await rm(videoPath);

  const response = await crackBotReaction({ file: uploaded.file });

  const updatedQueue: QueueCrackBotReaction = {
    ...queue,
    metadata: response.meta,
    payload: {
      ...queue.payload,
      script: response.script,
    },
  };

  messageQueue.publish(QUEUE.RENDER, updatedQueue);
}
