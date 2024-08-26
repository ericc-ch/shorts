import { messageQueue } from "@/lib/queue";
import { zValidator } from "@hono/zod-validator";
import { requestSchema } from "api-schema/crackbot.reaction";
import { type QueueCrackBotReaction, VIDEO_TYPE } from "api-schema/queue";
import { Hono } from "hono";
import { QUEUE } from "message-queue";

const routes = new Hono();

routes.post(
  "/generate/crackbot/reaction",
  zValidator("json", requestSchema),
  (c) => {
    const validated = c.req.valid("json");

    const reactionQueue: QueueCrackBotReaction = {
      id: globalThis.crypto.randomUUID(),
      isRendered: false,
      isScriptGenerated: false,
      isUploaded: false,

      payload: {
        backgroundVideoUrl: validated.url,
      },

      renderOptions: validated.renderOptions,
      type: VIDEO_TYPE.CRACKBOT_REACTION,
    };

    messageQueue.publish(QUEUE.SCRIPT, reactionQueue);
    return c.json(reactionQueue);
  },
);

export default routes;
