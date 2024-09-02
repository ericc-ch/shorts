import { VIDEO_TYPE } from "schema";

import { crackbotReaction } from "./crackbot.reaction";

export const renderFnsMap = new Map([
  [VIDEO_TYPE.CRACKBOT_REACTION, crackbotReaction],
] as const);
