import type { Queue } from "schema";

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import consola from "consola";
import { cpus } from "node:os";
import { join } from "pathe";

import { webpackOverride } from "./webpack-override";

export async function renderVideo(compositionId: string, queue: Queue) {
  const serveUrl = await bundle({
    entryPoint: join(import.meta.dir, "../remotion/index.ts"),
    webpackOverride: webpackOverride,
  });
  consola.success(`Bundled video: ${queue.id}.mp4`);

  const composition = await selectComposition({
    id: compositionId,
    serveUrl,
  });
  consola.success(`Selected composition: ${compositionId}`);

  let logCount = 0;
  const logFrequency = 400;

  const result = await renderMedia({
    codec: "h264",
    composition,
    concurrency: cpus().length,
    onProgress: ({ progress }) => {
      if (!progress) return;

      if (logCount % logFrequency === 0)
        consola.info(`Rendering progress: ${Math.floor(progress * 100)}%`);

      logCount += 1;
    },
    serveUrl,
  });

  return result.buffer;
}
