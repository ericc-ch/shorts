import type { GenerateResult } from "@ericc/edge-tts";

import { z } from "zod";

export const payloadCrackBotReaction = z.object({
  backgroundVideoPath: z.string().optional(),
  backgroundVideoUrl: z.string(),
  script: z.string().optional(),
  scriptPath: z.string().optional(),
});

export type PayloadCrackBotReaction = {
  subtitles?: GenerateResult["subtitle"];
} & z.infer<typeof payloadCrackBotReaction>;
