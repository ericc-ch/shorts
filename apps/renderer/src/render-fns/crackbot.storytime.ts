import type { Queue } from "schema";

import { generate } from "@ericc/edge-tts";
import { moveFile, ytDlp } from "common";
import consola from "consola";
import { QUEUE } from "message-queue";

import { writeConfig } from "../lib/files";
import {
  assetAudioPath,
  assetVideoPath,
  renderedVideoPath,
} from "../lib/paths";
import { messageQueue } from "../lib/queue";
import { renderVideo } from "../lib/render-video";

export async function crackbotStory(queue: Queue) {
  const { audio, subtitle } = await generate({
    language: queue.renderOptions.language,
    subtitle: {
      count: 1000,
      splitBy: "duration",
    },
    text: queue.payload.script!,
    voice: queue.renderOptions.voice,
    volume: "+50%",
  });

  const scriptPath = assetAudioPath(queue.id.toString());
  await Bun.write(scriptPath, audio);
  consola.success(`Generated audio: ${scriptPath}`);

  const downloadedVideoPath = await ytDlp({
    url: queue.payload.backgroundVideoUrl,
  });
  const videoFile = await moveFile(
    downloadedVideoPath,
    assetVideoPath(queue.id.toString()),
  );
  consola.success(`Downloaded video: ${videoFile.name}`);

  const downloadedMusicPath = await ytDlp({
    url: queue.payload.musicVideoUrl,
  });
  const musicFile = await moveFile(
    downloadedMusicPath,
    assetAudioPath(`${queue.id}_music`),
  );
  consola.success(`Downloaded music: ${musicFile.name}`);

  const config: Queue = {
    ...queue,
    payload: {
      ...queue.payload,
      backgroundVideoPath: videoFile.name,
      musicVideoPath: musicFile.name,
      scriptPath,
      subtitles: subtitle,
    },
  };

  await writeConfig(config);
  consola.success("Configuration written");

  const result = await renderVideo("CRACKBOTSTORY", queue);
  const blob = new Blob([result ?? new Blob()]);
  await Bun.write(renderedVideoPath(queue.id.toString()), blob);

  const updatedQueue: Queue = {
    ...config,
    isRendered: true,
    updatedAt: Date.now(),
  };

  messageQueue.send(QUEUE.PROGRESS, updatedQueue);
}
