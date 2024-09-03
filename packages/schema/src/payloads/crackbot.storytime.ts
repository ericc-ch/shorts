import type { GenerateResult } from "@ericc/edge-tts";

import { z } from "zod";

export const payloadCrackBotStory = z.object({
  backgroundVideoPath: z.string().optional(),
  backgroundVideoUrl: z.string(),

  musicVideoPath: z.string().optional(),
  musicVideoUrl: z.string(),

  script: z.string().optional(),
  scriptPath: z.string().optional(),
});

export type PayloadCrackBotStory = {
  subtitles?: GenerateResult["subtitle"];
} & z.infer<typeof payloadCrackBotStory>;
