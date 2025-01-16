import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"

import { metadata } from "../common.schema"

export const generatedCrackBotStory = z.object({
  meta: metadata,
  script: z
    .string()
    .describe("The story script that you're going to read in the video."),
})

export const promptCrackbotStorySchema = JSON.stringify(
  zodToJsonSchema(generatedCrackBotStory),
)
