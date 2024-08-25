import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import consola from "consola";
import { cpus } from "node:os";
import { join } from "pathe";
import { config } from "../remotion/lib/config";
import { webpackOverride } from "./webpack-override";

export async function renderVideo(compositionId: string) {
  const serveUrl = await bundle({
    entryPoint: join(import.meta.dir, "../remotion/index.ts"),
    webpackOverride: webpackOverride,
  });
  consola.success(`Bundled video: ${config.id}.mp4`);

  const composition = await selectComposition({
    serveUrl,
    id: compositionId,
  });
  consola.success(`Selected composition: ${compositionId}`);

  let logCount = 0;
  const logFrequency = 400;

  await renderMedia({
    serveUrl,
    composition,
    concurrency: cpus().length,
    outputLocation: join(import.meta.dir, `../../out/${config.id}.mp4`),
    codec: "h264",
    onProgress: ({ progress }) => {
      if (!progress) return;

      if (logCount % logFrequency === 0)
        consola.info(`Rendering progress: ${Math.floor(progress * 100)}%`);

      logCount += 1;
    },
  });
}
