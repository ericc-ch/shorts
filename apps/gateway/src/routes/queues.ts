import { getQueues } from "@/lib/db/queues";
import { Hono } from "hono";

const routes = new Hono();

routes.get("/queues", async (c) => {
  const queues = await getQueues();

  return c.json(queues);
});

export default routes;
