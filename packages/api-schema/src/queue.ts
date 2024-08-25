import type { Metadata, RenderOptions } from "./common";
import { type GenerateResult } from "@ericc/edge-tts";

export enum VIDEO_TYPE {
  CRACKBOT_REACTION,
  CRACKBOT_STORY,
  CRACKBOT_QUIZ,
}

export interface QueueBase {
  id: string;
  metadata: Metadata;
  isRendered: boolean;
  isUploaded: boolean;

  renderOptions: RenderOptions;

  type: VIDEO_TYPE;
  payload: unknown;
}

export interface QueueCrackBotReaction extends QueueBase {
  type: VIDEO_TYPE.CRACKBOT_REACTION;
  payload: {
    subtitles?: GenerateResult["subtitle"];

    script: string;
    scriptPath?: string;

    backgroundVideoUrl: string;
    backgroundVideoPath?: string;
  };
}

export type Queue = QueueCrackBotReaction;
