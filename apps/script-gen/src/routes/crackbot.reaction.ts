import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { bodySchema } from "api-schema/crackbot.reaction";

const routes = new Hono();

routes.post("/crackbot/reaction", zValidator("json", bodySchema), async (c) => {
  const validated = c.req.valid("json");

  console.log(validated);

  return c.json(validated, 200);
});

export default routes;
