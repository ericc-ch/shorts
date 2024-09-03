import { type Queue, VIDEO_TYPE } from "schema";

import { crackbotReaction } from "./crackbot.reaction";
import { crackbotStory } from "./crackbot.storytime";

export const genFnsMap = new Map<
  VIDEO_TYPE,
  (queue: Queue) => Promise<void> | void
>([
  [VIDEO_TYPE.CRACKBOT_REACTION, crackbotReaction],
  [VIDEO_TYPE.CRACKBOT_STORY, crackbotStory],
]);
