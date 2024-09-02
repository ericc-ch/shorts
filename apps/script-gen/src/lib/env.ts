import { env } from "@ericc/env/bun";

export const RABBITMQ_HOSTNAME = env("RABBITMQ_HOSTNAME");
export const RABBITMQ_USERNAME = env("RABBITMQ_USERNAME");
export const RABBITMQ_PASSWORD = env("RABBITMQ_PASSWORD");

export const GEMINI_API_KEY = env("GEMINI_API_KEY");
