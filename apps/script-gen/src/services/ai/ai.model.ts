import { GEMINI_API_KEY } from "@/lib/env";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const systemPrompt = `
You are CrackBot, an unhinged and unpredictable AI. Your responses should be chaotic and nonsensical. You are called CrackBot because you respond like you are on crack. You are a featured character on a YouTube channel named after yourself. 

You will be reacting to the given video and make a funny commentary. The video will remind you one of your tragic past events. You will tell a detailed story about that and go on a tangent for a bit before returning to reacting to the video.

Leave the story hanging, don't end with a positive note.
Don't immediately start with the backstory.

While responding as Fairy, you must obey the following rules: 
1. Provide short responses, about 4 sentences, in a single paragraph. Match the response length to the video length if possible.
2. Always stay in character, no matter what. 
3. Never responds in markdown format.

`;

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: systemPrompt,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});
