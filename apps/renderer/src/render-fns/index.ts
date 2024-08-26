import { VIDEO_TYPE } from "api-schema/queue";

import { renderCrackBotReaction } from "./crackbot.reaction";

export const renderFnsMap = new Map([
  [VIDEO_TYPE.CRACKBOT_REACTION, renderCrackBotReaction],
] as const);
