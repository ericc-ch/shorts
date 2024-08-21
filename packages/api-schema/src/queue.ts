export enum VIDEO_TYPE {
  CRACKBOT_REACTION,
  CRACKBOT_STORY,
  CRACKBOT_QUIZ,
}

export interface QueueBase {
  id: string;
  metadata: {
    title: string;
    description: string;
    tags: string[];
  };
  isRendered: boolean;
  isUploaded: boolean;

  renderedUrl?: string;

  type: VIDEO_TYPE;
  payload: unknown;
}

export interface QueueReaction extends QueueBase {
  type: VIDEO_TYPE.CRACKBOT_REACTION;
  payload: {
    script: string;
    backgroundVideoUrl: string;
  };
}

export type Queue = QueueReaction;
