import type { GenerationConfig, StartChatParams } from "@google/generative-ai";

import { retryParse } from "@/lib/retry-parse";
import consola from "consola";
import { generatedCrackBotStory } from "schema";

import { model } from "./crackbot.storytime.model";

const generationConfig: GenerationConfig = {
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  temperature: 1,
  topK: 64,
  topP: 0.95,
};

const createSession = (params?: Omit<StartChatParams, "generationConfig">) =>
  model.startChat({
    ...params,
    generationConfig,
  });

export const crackBotStory = async () => {
  const getResponse = async () => {
    const session = createSession();

    consola.info(`Waiting for Gemini response: CrackBot Reaction`);
    const reply = await session.sendMessage([
      {
        text: "Please generate a story about you",
      },
    ]);

    return reply.response.text();
  };

  const parsed = await retryParse({
    fn: getResponse,
    retries: 3,
  });

  consola.success(
    `Got Gemini response: ${JSON.stringify(parsed).slice(0, 100)}`,
  );

  const response = generatedCrackBotStory.parse(parsed);
  consola.success(`Gemini response successfully validated`);

  return response;
};
