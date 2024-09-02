import { env } from "@ericc/env/bun";

export const RABBITMQ_HOSTNAME = env("RABBITMQ_HOSTNAME");
export const RABBITMQ_USERNAME = env("RABBITMQ_USERNAME");
export const RABBITMQ_PASSWORD = env("RABBITMQ_PASSWORD");

export const RENDER_OUTPUT = env("RENDER_OUTPUT");
