import { getQueues, markAsUploadedQueue } from "@/lib/db/queues";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const routes = new Hono();

routes.get("/queues", async (c) => {
  const queues = await getQueues();

  return c.json(queues);
});

routes.post(
  "/queues/mark-uploaded",
  zValidator(
    "json",
    z.object({
      ids: z.array(z.number()),
    }),
  ),
  async (c) => {
    const validated = c.req.valid("json");
    const ids = validated.ids;

    const result = await markAsUploadedQueue(ids, { isUploaded: true });

    return c.json(result);
  },
);

export default routes;
