import consola from "consola";
import { QUEUE } from "message-queue";

import { genFnsMap } from "./gen-fns";
import { messageQueue } from "./lib/queue";

await messageQueue.consume(QUEUE.SCRIPT, async (data, ack) => {
  consola.info(`Received generation request: ${data.id}`);

  const func = genFnsMap.get(data.type);
  if (!func) throw new Error(`Unknown video type: ${data.type}`);

  await func(data);
  consola.success(`Script generated: ${data.id}`);

  ack();
});
