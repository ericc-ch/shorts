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

    consola.info(`Waiting for Gemini response: CrackBot Story`);
    const reply = await session.sendMessage([
      {
        text: "Generate a short, engaging story about Crackbot (an AI character) in first person. The story should be entertaining, funny, and suitable for short-form video content. Include a title and description with hashtags. Format the response as JSON with 'script', 'title', and 'description' fields.",
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
