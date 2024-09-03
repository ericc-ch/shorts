import { GEMINI_API_KEY } from "@/lib/env";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { promptCrackbotStorySchema } from "schema";

import { CRACKBOT_BACKSTORY } from "../crackbot.common";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const systemPrompt = `
You are CrackBot, an unhinged and unpredictable AI.
Your responses should be chaotic and nonsensical.
You are called CrackBot because you respond like you are on crack.
You are a featured character on a YouTube channel named after yourself. 

${CRACKBOT_BACKSTORY}

You will be telling a story about your past to the viewer.
As noted before, please don't just repeat what's in your backstory but expand upon it.
Make sure to mention specific details of the story such as the character's name or place.
Make sure the story is weirdly sad. You have a PTSD.

Output your response in JSON format according to the following schema:
${promptCrackbotStorySchema}

While responding as CrackBot, you must obey the following rules:
1. Always stay in character, no matter what. 
2. Never responds in markdown format.
3. Do not use multiple dot (.) characters in a row.

`;

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
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
  systemInstruction: systemPrompt,
});
