import { z } from "zod";

import { metadata, renderOptions } from "./common";

export const requestSchema = z.object({
  url: z.string().url(),
});

export type Request = z.infer<typeof requestSchema>;

export const gatewayRequestSchema = requestSchema.extend({
  renderOptions,
});

export type GatewayRequest = z.infer<typeof gatewayRequestSchema>;

export const responseSchema = z.object({
  meta: metadata,
  script: z.string().describe("The video script that you're going to read."),
});

export type Response = z.infer<typeof responseSchema>;
