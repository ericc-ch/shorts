import type { Queue } from "api-schema/queue";
import { mkdir, rm } from "node:fs/promises";
import { configPath, PUBLIC_DIR } from "./paths";

type WriteConfigOption = {
  dir: string;
  filename?: string;
};

export function writeConfig(
  config: Queue,
  options: WriteConfigOption = { dir: PUBLIC_DIR },
) {
  return Bun.write(
    configPath(options.dir, options.filename),
    JSON.stringify(config),
  );
}

export async function clearAssets() {
  await rm(PUBLIC_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR);
}
