import { rm, mkdir } from "node:fs/promises";
import type { Queue } from "api-schema/queue";
import { PUBLIC_DIR, VIDEO_CONFIG_PATH } from "./paths";

export async function writeConfig(config: Queue) {
  return Bun.write(VIDEO_CONFIG_PATH, JSON.stringify(config));
}

export async function clearAssets() {
  await rm(PUBLIC_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR);
}
