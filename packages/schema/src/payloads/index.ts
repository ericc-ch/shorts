import type { PayloadCrackBotReaction } from "./crackbot.reaction";
import type { PayloadCrackBotStory } from "./crackbot.storytime";

export type Payload = PayloadCrackBotReaction | PayloadCrackBotStory;

export * from "./crackbot.reaction";
export * from "./crackbot.storytime";
