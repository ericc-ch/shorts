import { VIDEO_TYPE } from "api-schema/queue";
import { CrackBotReaction } from "./crackbot.reaction/Composition";

export const compositionMap = new Map([
  [VIDEO_TYPE.CRACKBOT_REACTION, CrackBotReaction],
] as const);
