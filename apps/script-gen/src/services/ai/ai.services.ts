import type { GenerationConfig, StartChatParams } from "@google/generative-ai";
import { model } from "./ai.model";

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const createSession = (
  params?: Omit<StartChatParams, "generationConfig">
) =>
  model.startChat({
    ...params,
    generationConfig,
  });
