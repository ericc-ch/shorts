import consola from "consola";
import { QUEUE } from "message-queue";

import { updateQueue } from "./lib/db/queues";
import { messageQueue } from "./lib/queue";

export function consumeProgress() {
  void messageQueue.consume(QUEUE.PROGRESS, async (data, ack) => {
    consola.info(`Received new progress: ${data.id}`);

    await updateQueue(data.id, data);
    consola.success(`Updated progress: ${data.id}`);

    ack();
  });
}
