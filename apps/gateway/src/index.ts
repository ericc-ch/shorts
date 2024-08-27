import type { Serve } from "bun";

import { Hono } from "hono";
import { basicAuth as basicAuthMiddleware } from "hono/basic-auth";
import { logger } from "hono/logger";

import {
  GATEWAY_AUTH_PASSWORD,
  GATEWAY_AUTH_USERNAME,
  SERVER_PORT_GATEWAY,
} from "./lib/env";
import { routes } from "./routes";
import { consumeProgress } from "./consume-progress";

const app = new Hono();
app.use("*", logger());
app.use(
  "*",
  basicAuthMiddleware({
    password: GATEWAY_AUTH_PASSWORD,
    username: GATEWAY_AUTH_USERNAME,
  }),
);

for (const route of routes) {
  app.route("/", route);
}

consumeProgress();

export default {
  fetch: app.fetch,
  port: SERVER_PORT_GATEWAY,
} satisfies Serve;
