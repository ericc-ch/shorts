import { amqplib, RenderQueue } from "message-queue";
import { RABBITMQ_HOSTNAME, RABBITMQ_PASSWORD, RABBITMQ_USERNAME } from './env';

const connection = await amqplib.connect({
  hostname: RABBITMQ_HOSTNAME,
  username: RABBITMQ_USERNAME,
  password: RABBITMQ_PASSWORD
});

export const renderQueue = await new RenderQueue(connection).init();
