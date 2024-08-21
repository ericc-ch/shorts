import { renderQueue } from "@/lib/queue";
import { generateCrackbotReaction } from "@/services/generate";
import { zValidator } from "@hono/zod-validator";
import { requestSchema } from "api-schema/crackbot.reaction";
import { VIDEO_TYPE, type QueueCrackBotReaction } from "api-schema/queue";
import { Hono } from "hono";

const routes = new Hono();

routes.post(
  "/generate/crackbot/reaction",
  zValidator("json", requestSchema),
  async (c) => {
    const validated = c.req.valid("json");

    const response = await generateCrackbotReaction(validated);

    const reactionQueue: QueueCrackBotReaction = {
      id: globalThis.crypto.randomUUID(),
      isRendered: false,
      isUploaded: false,
      renderedUrl: undefined,
      metadata: response.meta,

      type: VIDEO_TYPE.CRACKBOT_REACTION,
      payload: {
        backgroundVideoUrl: validated.url,
        script: response.script,
      },
    };

    await renderQueue.publish(reactionQueue);
    return c.json(response);
  }
);

export default routes;
