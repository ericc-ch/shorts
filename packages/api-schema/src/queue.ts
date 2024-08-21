import type { Metadata } from "./common";

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

  renderedUrl?: string;

  type: VIDEO_TYPE;
  payload: unknown;
}

export interface QueueCrackBotReaction extends QueueBase {
  type: VIDEO_TYPE.CRACKBOT_REACTION;
  payload: {
    script: string;
    backgroundVideoUrl: string;
  };
}

export type Queue = QueueCrackBotReaction;
