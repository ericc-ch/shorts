import { z } from "zod";

export const bodySchema = z.object({
  url: z.string().url(),
});
