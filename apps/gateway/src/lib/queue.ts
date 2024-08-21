import { amqplib, RenderQueue } from "message-queue";

const connection = await amqplib.connect("amqp://localhost");

export const renderQueue = await new RenderQueue(connection).init();
