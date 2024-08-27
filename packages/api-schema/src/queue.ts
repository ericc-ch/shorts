import { type GenerateResult } from "@ericc/edge-tts";

import type { Metadata, RenderOptions } from "./common";
export * from "./common";

export enum VIDEO_TYPE {
  CRACKBOT_REACTION,
  CRACKBOT_STORY,
  CRACKBOT_QUIZ,
}

export interface QueueBase {
  id: number;
  type: VIDEO_TYPE;

  isRendered: boolean;
  isScriptGenerated: boolean;
  isUploaded: boolean;

  payload: unknown;
  renderOptions: RenderOptions;

  metadata?: Metadata | null;

  createdAt: number;
  updatedAt: number;
}

export interface QueueCrackBotReaction extends QueueBase {
  payload: {
    backgroundVideoPath?: string;
    backgroundVideoUrl: string;

    script?: string;
    scriptPath?: string;

    subtitles?: GenerateResult["subtitle"];
  };
  type: VIDEO_TYPE.CRACKBOT_REACTION;
}

export type Queue = QueueCrackBotReaction;
