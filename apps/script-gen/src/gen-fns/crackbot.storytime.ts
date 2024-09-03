import type { Queue } from "schema";

import { messageQueue } from "@/lib/queue";
import { crackBotStory as crackBotStoryService } from "@/services/crackbot.storytime";
import { QUEUE } from "message-queue";

export async function crackbotStory(queue: Queue) {
  const response = await crackBotStoryService();

  const updatedQueue: Queue = {
    ...queue,
    isScriptGenerated: true,

    payload: {
      ...queue.payload,
      script: response.script,
    },

    metadata: response.meta,
    updatedAt: Date.now(),
  };

  messageQueue.send(QUEUE.RENDER, updatedQueue);
  messageQueue.send(QUEUE.PROGRESS, updatedQueue);
}
