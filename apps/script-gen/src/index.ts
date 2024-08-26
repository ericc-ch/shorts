import type { Serve } from "bun";

import { Hono } from "hono";
import { logger } from "hono/logger";

import { SERVER_PORT_SCRIPT_GEN } from "./lib/env";
import { deleteUploadedFiles } from "./lib/files";
import { routes } from "./routes";

await deleteUploadedFiles();

const app = new Hono();
app.use("*", logger());

for (const route of routes) {
  app.route("/", route);
}

export default {
  fetch: app.fetch,
  port: SERVER_PORT_SCRIPT_GEN,
} satisfies Serve;
