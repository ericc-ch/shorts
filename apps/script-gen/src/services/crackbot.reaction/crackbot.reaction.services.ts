import type { GenerationConfig, StartChatParams } from "@google/generative-ai";
import type { FileMetadataResponse } from "@google/generative-ai/server";
import consola from "consola";
import { model } from "./crackbot.reaction.model";
import { responseSchema } from "api-schema/crackbot.reaction";
import { retryParse } from "@/lib/retry-parse";

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
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

    consola.log(`Waiting for Gemini response: CrackBot Reaction`);
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
    `Got Gemini response: ${JSON.stringify(parsed).slice(0, 100)}`
  );

  const response = responseSchema.parse(parsed);
  consola.success(`Gemini response successfully validated`);

  return response;
};
