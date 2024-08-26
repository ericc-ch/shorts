import { amqplib, RenderQueue } from "message-queue";

import { RABBITMQ_HOSTNAME, RABBITMQ_PASSWORD, RABBITMQ_USERNAME } from "./env";

const connection = await amqplib.connect({
  hostname: RABBITMQ_HOSTNAME,
  password: RABBITMQ_PASSWORD,
  username: RABBITMQ_USERNAME,
});

export const renderQueue = await new RenderQueue(connection).init();
