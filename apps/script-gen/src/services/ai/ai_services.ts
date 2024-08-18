import { model } from "@/services/ai/ai_model.ts";
import { GenerationConfig } from "@google/generative-ai";
import { join } from "@std/path";

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});

export async function saveChatHistory() {
  console.log("Saving chat history...");
  const historyDir = join(Deno.cwd(), "history", `history-${Date.now()}.json`);
  const chatHistory = await chatSession.getHistory();

  Deno.writeTextFileSync(historyDir, JSON.stringify(chatHistory));
}
