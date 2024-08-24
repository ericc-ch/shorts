import type { Serve } from "bun";
import { Hono } from "hono";
import { basicAuth as basicAuthMiddleware } from "hono/basic-auth";
import { logger } from "hono/logger";
import { GATEWAY_AUTH_PASSWORD, GATEWAY_AUTH_USERNAME, GATEWAY_SERVER_PORT } from "./lib/env";
import { routes } from "./routes";

const app = new Hono();
app.use("*", logger());
app.use(
  "*",
  basicAuthMiddleware({ username: GATEWAY_AUTH_USERNAME, password: GATEWAY_AUTH_PASSWORD }),
);

for (const route of routes) {
  app.route("/", route);
}

export default {
  fetch: app.fetch,
  port: GATEWAY_SERVER_PORT,
} satisfies Serve;
