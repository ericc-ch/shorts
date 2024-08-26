import { renderQueue } from "@/lib/queue";
import { generateCrackbotReaction } from "@/services/generate";
import { zValidator } from "@hono/zod-validator";
import { gatewayRequestSchema } from "api-schema/crackbot.reaction";
import { type QueueCrackBotReaction, VIDEO_TYPE } from "api-schema/queue";
import { Hono } from "hono";

const routes = new Hono();

routes.post(
  "/generate/crackbot/reaction",
  zValidator("json", gatewayRequestSchema),
  async (c) => {
    const validated = c.req.valid("json");

    const response = await generateCrackbotReaction(validated);

    const reactionQueue: QueueCrackBotReaction = {
      id: globalThis.crypto.randomUUID(),
      isRendered: false,
      isUploaded: false,
      metadata: response.meta,

      payload: {
        backgroundVideoUrl: validated.url,
        script: response.script,
      },

      renderOptions: validated.renderOptions,
      type: VIDEO_TYPE.CRACKBOT_REACTION,
    };

    renderQueue.publish(reactionQueue);
    return c.json(response);
  },
);

export default routes;
