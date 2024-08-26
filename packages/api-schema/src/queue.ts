import { type GenerateResult } from "@ericc/edge-tts";

import type { Metadata, RenderOptions } from "./common";

export enum VIDEO_TYPE {
  CRACKBOT_REACTION,
  CRACKBOT_STORY,
  CRACKBOT_QUIZ,
}

export interface QueueBase {
  id: string;
  isRendered: boolean;
  isUploaded: boolean;
  metadata: Metadata;

  payload: unknown;

  renderOptions: RenderOptions;
  type: VIDEO_TYPE;
}

export interface QueueCrackBotReaction extends QueueBase {
  payload: {
    backgroundVideoPath?: string;

    backgroundVideoUrl: string;
    script: string;

    scriptPath?: string;
    subtitles?: GenerateResult["subtitle"];
  };
  type: VIDEO_TYPE.CRACKBOT_REACTION;
}

export type Queue = QueueCrackBotReaction;
