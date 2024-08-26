import { VIDEO_TYPE } from "api-schema/queue";
import consola from "consola";
import { QUEUE } from "message-queue";
import { exists, mkdir } from "node:fs/promises";

import { clearAssets } from "./lib/files";
import { PUBLIC_DIR } from "./lib/paths";
import { messageQueue } from "./lib/queue";
import { renderCrackBotReaction } from "./render-fns/crackbot.reaction";

if (!(await exists(PUBLIC_DIR))) await mkdir(PUBLIC_DIR);

const functionMap = new Map([
  [VIDEO_TYPE.CRACKBOT_REACTION, renderCrackBotReaction],
] as const);

await messageQueue.subscribe(QUEUE.RENDER, async (data, ack) => {
  consola.info(`Received render request: ${data.id}`);

  const func = functionMap.get(data.type);
  if (!func) throw new Error(`Unknown video type: ${data.type}`);

  await func(data);
  consola.success(`Rendered video: ${data.id}`);

  ack();

  await clearAssets();
  consola.info(`Cleared assets (public) folder`);
});
