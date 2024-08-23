import type { Serve } from "bun";
import { Hono } from "hono";
import { basicAuth as basicAuthMiddleware } from "hono/basic-auth";
import { logger } from "hono/logger";
import { AUTH_PASSWORD, AUTH_USERNAME, SERVER_PORT } from "./lib/env";
import { routes } from "./routes";

const app = new Hono();
app.use("*", logger());
app.use(
  "*",
  basicAuthMiddleware({ username: AUTH_USERNAME, password: AUTH_PASSWORD }),
);

for (const route of routes) {
  app.route("/", route);
}

export default {
  fetch: app.fetch,
  port: SERVER_PORT,
} satisfies Serve;
