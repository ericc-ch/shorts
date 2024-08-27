import { insertQueue } from "@/lib/db/queues";
import { messageQueue } from "@/lib/queue";
import { zValidator } from "@hono/zod-validator";
import { requestSchema } from "api-schema/crackbot.reaction";
import { VIDEO_TYPE } from "api-schema/queue";
import { Hono } from "hono";
import { QUEUE } from "message-queue";

const routes = new Hono();

routes.post(
  "/generate/crackbot/reaction",
  zValidator("json", requestSchema),
  async (c) => {
    const validated = c.req.valid("json");

    const queue = await insertQueue({
      isRendered: false,
      isScriptGenerated: false,
      isUploaded: false,

      payload: {
        backgroundVideoUrl: validated.url,
      },
      renderOptions: validated.renderOptions,

      type: VIDEO_TYPE.CRACKBOT_REACTION,
    });

    messageQueue.send(QUEUE.SCRIPT, queue);
    return c.json(queue);
  },
);

export default routes;
