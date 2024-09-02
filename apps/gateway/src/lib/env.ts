import { env } from "@ericc/env/bun";
import { join } from "pathe";

export const SERVER_PORT_GATEWAY = env("SERVER_PORT_GATEWAY");

export const DATABASE_DIR = env(
  "DATABASE_DIR",
  join(import.meta.dir, "../../"),
);

export const RABBITMQ_HOSTNAME = env("RABBITMQ_HOSTNAME");
export const RABBITMQ_USERNAME = env("RABBITMQ_USERNAME");
export const RABBITMQ_PASSWORD = env("RABBITMQ_PASSWORD");

export const RENDER_OUTPUT = env("RENDER_OUTPUT");
