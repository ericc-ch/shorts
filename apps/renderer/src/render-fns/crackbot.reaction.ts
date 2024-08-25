import { generate } from "@ericc/edge-tts";
import { type QueueCrackBotReaction } from "api-schema/queue";
import { moveFile, ytDlp } from "common";
import consola from "consola";
import { RENDER_OUTPUT } from "../lib/env";
import { writeConfig } from "../lib/files";
import {
  assetAudioPath,
  assetVideoPath,
  outputVideoPath,
  renderedVideoPath,
} from "../lib/paths";
import { renderVideo } from "../lib/render-video";

export async function renderCrackBotReaction(queue: QueueCrackBotReaction) {
  const { audio, subtitle } = await generate({
    text: queue.payload.script,
    language: queue.renderOptions.language,
    voice: queue.renderOptions.voice,

    subtitle: {
      splitBy: "duration",
      count: 1000,
    },
  });

  const scriptPath = assetAudioPath(queue.id);
  await Bun.write(scriptPath, audio);
  consola.success(`Generated audio: ${scriptPath}`);

  const downloadedPath = await ytDlp({
    url: queue.payload.backgroundVideoUrl,
  });
  const file = await moveFile(downloadedPath, assetVideoPath(queue.id));
  consola.success(`Downloaded video: ${file.name}`);

  const config: QueueCrackBotReaction = {
    ...queue,
    payload: {
      ...queue.payload,
      subtitles: subtitle,
      backgroundVideoPath: file.name,
      scriptPath,
    },
  };

  await writeConfig(config);
  consola.success("Configuration written");

  await renderVideo("CRACKBOTREACTION", queue);

  await moveFile(outputVideoPath(queue.id), renderedVideoPath(queue.id));
  consola.success(`Moved video: ${renderedVideoPath(queue.id)}`);

  await writeConfig(config, {
    dir: RENDER_OUTPUT,
    filename: `${config.id}.json`,
  });
  consola.success("Rendered configuration written");
}
