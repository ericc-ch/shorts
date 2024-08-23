import { join } from "pathe";

export const PUBLIC_DIR = join(import.meta.dir, "../../public");

export const VIDEO_CONFIG_PATH = join(PUBLIC_DIR, "config.json");

export const audioPath = (name: string) => join(PUBLIC_DIR, `${name}.mp3`);
export const videoPath = (name: string) => join(PUBLIC_DIR, `${name}.mp4`);
