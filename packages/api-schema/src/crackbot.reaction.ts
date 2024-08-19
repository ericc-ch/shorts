import { z } from "zod";

export const bodySchema = z.object({
  url: z.string().url(),
});

const metadata = z
  .object({
    title: z
      .string()
      .describe("The video title. Clickbait-y titles are recommended."),
    description: z
      .string()
      .describe(
        "The video description. This is a YouTube Short video, so the description should only be 1 sentence long."
      ),
    tags: z
      .array(z.string())
      .min(3, "There must be at least 3 tags.")
      .nonempty()
      .describe("The video tags/topic. Each tag should be only a single word.")
      .refine(
        (tags) => new Set(tags).size === tags.length,
        "Tags must be unique."
      ),
  })
  .strict()
  .describe("Metadata about the video. Used when uploading to YouTube.");

export const responseSchema = z.object({
  meta: metadata,
  script: z.string().describe("The video script that you're going to read."),
});
