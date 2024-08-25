import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import type { Queue } from "api-schema/queue";
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
    serveUrl,
    id: compositionId,
  });
  consola.success(`Selected composition: ${compositionId}`);

  let logCount = 0;
  const logFrequency = 400;

  const result = await renderMedia({
    serveUrl,
    composition,
    concurrency: cpus().length,
    codec: "h264",
    onProgress: ({ progress }) => {
      if (!progress) return;

      if (logCount % logFrequency === 0)
        consola.info(`Rendering progress: ${Math.floor(progress * 100)}%`);

      logCount += 1;
    },
  });

  return result.buffer;
}
