import { type Queue, VIDEO_TYPE } from "api-schema/queue";

import configJson from "~/public/config.json";

// Needed for type casting
export const config = configJson as Queue;

export const FPS = 60;
export const FRAME_IN_MS = 1000 / FPS;

export const getVideoDuration = () => {
  switch (config.type) {
    case VIDEO_TYPE.CRACKBOT_REACTION:
      return config.payload.subtitles?.at(-1)?.end ?? 0;

    default:
      throw new Error(`Unknown video type: ${config.type as string}`);
  }
};
