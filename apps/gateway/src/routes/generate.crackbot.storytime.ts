import { insertQueue } from "@/lib/db/queues";
import { messageQueue } from "@/lib/queue";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { QUEUE } from "message-queue";
import { payloadCrackBotStory, renderOptions, VIDEO_TYPE } from "schema";

const routes = new Hono();

const schema = payloadCrackBotStory.extend({
  renderOptions,
});

routes.post(
  "/generate/crackbot/story",
  zValidator("json", schema),
  async (c) => {
    const validated = c.req.valid("json");

    const queue = await insertQueue({
      isRendered: false,
      isScriptGenerated: false,
      isUploaded: false,

      payload: {
        backgroundVideoUrl: validated.backgroundVideoUrl,
        musicVideoUrl: validated.musicVideoUrl,
      },
      renderOptions: validated.renderOptions,

      type: VIDEO_TYPE.CRACKBOT_STORY,

      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    messageQueue.send(QUEUE.SCRIPT, queue);
    return c.json(queue);
  },
);

export default routes;
