import { VIDEO_TYPE } from "api-schema/queue";
import consola from "consola";
import { renderQueue } from "./lib/queue";
import { renderCrackBotReaction } from "./lib/renders/crackbot.reaction";
import { clearAssets } from "./lib/files";
import { exists, mkdir } from "node:fs/promises";
import { PUBLIC_DIR } from "./lib/paths";

if (!(await exists(PUBLIC_DIR))) await mkdir(PUBLIC_DIR);

const functionMap = new Map([
  [VIDEO_TYPE.CRACKBOT_REACTION, renderCrackBotReaction],
] as const);

renderQueue.subscribe(async (data, ack) => {
  consola.info(`Received render request: ${data.id}`);

  const func = functionMap.get(data.type);
  if (!func) throw new Error(`Unknown video type: ${data.type}`);

  await func(data);
  consola.success(`Rendered video: ${data.id}`);

  await clearAssets();
  consola.info(`Cleared assets (public) folder`);

  ack();
});
