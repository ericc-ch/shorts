import consola from "consola";
import { QUEUE } from "message-queue";
import { exists, mkdir } from "node:fs/promises";

import { clearAssets } from "./lib/files";
import { PUBLIC_DIR } from "./lib/paths";
import { messageQueue } from "./lib/queue";
import { renderFnsMap } from "./render-fns";

if (!(await exists(PUBLIC_DIR))) await mkdir(PUBLIC_DIR);

await messageQueue.subscribe(QUEUE.RENDER, async (data, ack) => {
  consola.info(`Received render request: ${data.id}`);

  const func = renderFnsMap.get(data.type);
  if (!func) throw new Error(`Unknown video type: ${data.type}`);

  await func(data);
  consola.success(`Rendered video: ${data.id}`);

  ack();

  await clearAssets();
  consola.info(`Cleared assets (public) folder`);
});
