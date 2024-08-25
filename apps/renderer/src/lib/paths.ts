import { join } from "pathe";
import { RENDER_OUTPUT } from "./env";

export const PUBLIC_DIR = join(import.meta.dir, "../../public");
export const OUTPUT_DIR = join(import.meta.dir, "../../out");

export const configPath = (dir: string, filename = "config.json") =>
  join(dir, filename);
export const assetAudioPath = (name: string) => join(PUBLIC_DIR, `${name}.mp3`);
export const assetVideoPath = (name: string) => join(PUBLIC_DIR, `${name}.mp4`);

export const outputVideoPath = (id: string) => join(OUTPUT_DIR, `${id}.mp4`);
export const renderedVideoPath = (id: string) =>
  join(RENDER_OUTPUT, `${id}.mp4`);
