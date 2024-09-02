import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { metadata } from "../common.schema";

export const generatedCrackBotReaction = z.object({
  meta: metadata,
  script: z.string().describe("The video script that you're going to read."),
});

export const promptCrackbotReactionSchema = JSON.stringify(
  zodToJsonSchema(generatedCrackBotReaction),
);
