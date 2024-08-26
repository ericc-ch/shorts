import { renderQueue } from "@/lib/queue";
import { generateCrackbotReaction } from "@/services/generate";
import { zValidator } from "@hono/zod-validator";
import { gatewayRequestSchema } from "api-schema/crackbot.reaction";
import { VIDEO_TYPE, type QueueCrackBotReaction } from "api-schema/queue";
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
      metadata: response.meta,
      isRendered: false,
      isUploaded: false,

      renderOptions: validated.renderOptions,

      type: VIDEO_TYPE.CRACKBOT_REACTION,
      payload: {
        script: response.script,
        backgroundVideoUrl: validated.url,
      },
    };

    renderQueue.publish(reactionQueue);
    return c.json(response);
  },
);

export default routes;
