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

  isScriptGenerated: boolean;
  isRendered: boolean;
  isUploaded: boolean;

  renderOptions: RenderOptions;
  payload: unknown;

  metadata?: Metadata | null;

  createdAt: Date;
  updatedAt: Date;
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
