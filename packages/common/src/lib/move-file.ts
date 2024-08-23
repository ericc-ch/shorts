import { rm } from "node:fs/promises";

export async function moveFile(oldPath: string, newPath: string) {
  const file = Bun.file(oldPath);
  await Bun.write(newPath, file);

  await rm(oldPath);
  return Bun.file(newPath);
}
