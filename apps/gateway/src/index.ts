import type { Serve } from "bun";

import { Hono } from "hono";
import { logger } from "hono/logger";

import { consumeProgress } from "./consume-progress";
import { SERVER_PORT_GATEWAY } from "./lib/env";
import { routes } from "./routes";

const app = new Hono();
app.use("*", logger());

for (const route of routes) {
  app.route("/", route);
}

consumeProgress();

export default {
  fetch: app.fetch,
  port: SERVER_PORT_GATEWAY,
} satisfies Serve;
