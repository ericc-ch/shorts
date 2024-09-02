import type { GenerationConfig, StartChatParams } from "@google/generative-ai";
import type { FileMetadataResponse } from "@google/generative-ai/server";

import { retryParse } from "@/lib/retry-parse";
import consola from "consola";
import { generatedCrackBotReaction } from "schema";

import { model } from "./crackbot.reaction.model";

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

interface CrackBotReactionOptions {
  file: FileMetadataResponse;
}

export const crackBotReaction = async ({ file }: CrackBotReactionOptions) => {
  const getResponse = async () => {
    const session = createSession();

    consola.info(`Waiting for Gemini response: CrackBot Reaction`);
    const reply = await session.sendMessage([
      {
        fileData: {
          fileUri: file.uri,
          mimeType: file.mimeType,
        },
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

  const response = generatedCrackBotReaction.parse(parsed);
  consola.success(`Gemini response successfully validated`);

  return response;
};
