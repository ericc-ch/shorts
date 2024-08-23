import amqp from "amqplib";
import type { Queue, QueueBase } from "api-schema/queue";
import invariant from "tiny-invariant";
import { deserialize, serialize } from "../serializer";
import { QUEUE } from "../types";

const ERROR_MSG_NOT_INITIALIZED = "Channel not initialized. Call init() first";

export class RenderQueue {
  private connection: amqp.Connection;
  private channel?: amqp.Channel;

  constructor(connection: amqp.Connection) {
    this.connection = connection;
  }

  public init = async () => {
    this.channel = await this.connection.createChannel();
    this.channel.assertQueue(QUEUE.RENDER);

    return this;
  };

  public publish = async <Q extends QueueBase>(data: Q) => {
    invariant(this.channel, ERROR_MSG_NOT_INITIALIZED);

    const serialized = serialize(data);

    this.channel.sendToQueue(QUEUE.RENDER, serialized);
  };

  public subscribe = async (
    callback: (data: Queue, ack: () => void) => void | Promise<void>
  ) => {
    invariant(this.channel, ERROR_MSG_NOT_INITIALIZED);

    this.channel.consume(QUEUE.RENDER, (message) => {
      if (!message) return;

      callback(deserialize(message.content), () => this.ack(message));
    });
  };

  private ack = (message: amqp.ConsumeMessage) => {
    invariant(this.channel, ERROR_MSG_NOT_INITIALIZED);
    this.channel.ack(message);
  };
}
