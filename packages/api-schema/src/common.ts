import { z } from "zod";

export const metadata = z
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
      .nonempty()
      .describe("The video tags/topic. Each tag should be only a single word.")
      .refine(
        (tags) => new Set(tags).size === tags.length,
        "Tags must be unique."
      ),
  })
  .strict()
  .describe("Metadata about the video. Used when uploading to YouTube.");

export type Metadata = z.infer<typeof metadata>;

export const renderOptions = z.object({
  language: z.string(),
  voice: z.string(),
});

export type RenderOptions = z.infer<typeof renderOptions>;
