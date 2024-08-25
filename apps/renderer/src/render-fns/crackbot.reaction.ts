import { generate } from "@ericc/edge-tts";
import { type QueueCrackBotReaction } from "api-schema/queue";
import { moveFile, ytDlp } from "common";
import consola from "consola";
import { writeConfig } from "../lib/files";
import { audioPath, videoPath } from "../lib/paths";
import { renderVideo } from '../lib/render-video';

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

  const scriptPath = audioPath(queue.id);
  await Bun.write(scriptPath, audio);
  consola.success(`Generated audio: ${scriptPath}`);

  const downloadedPath = await ytDlp({
    url: queue.payload.backgroundVideoUrl,
  });
  const file = await moveFile(downloadedPath, videoPath(queue.id));
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

  await renderVideo('CRACKBOTREACTION')
}
