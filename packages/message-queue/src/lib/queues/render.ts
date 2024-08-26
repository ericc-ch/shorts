import amqp from "amqplib";
import type { Queue, QueueBase } from "api-schema/queue";
import invariant from "tiny-invariant";
import { deserialize, serialize } from "../serializer";
import { QUEUE } from "../types";

const ERROR_MSG_NOT_INITIALIZED = "Channel not initialized. Call init() first";

type InitOptions = {
  prefetch?: number;
};

export class RenderQueue {
  private connection: amqp.Connection;
  private channel?: amqp.Channel;

  constructor(connection: amqp.Connection) {
    this.connection = connection;
  }

  public init = async ({ prefetch = 1 }: InitOptions = {}) => {
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(QUEUE.RENDER);
    await this.channel.prefetch(prefetch);

    return this;
  };

  public publish = (data: QueueBase) => {
    invariant(this.channel, ERROR_MSG_NOT_INITIALIZED);

    const serialized = serialize(data);

    this.channel.sendToQueue(QUEUE.RENDER, serialized);
  };

  public subscribe = (
    callback: (data: Queue, ack: () => void) => void | Promise<void>,
  ) => {
    invariant(this.channel, ERROR_MSG_NOT_INITIALIZED);

    return this.channel.consume(QUEUE.RENDER, (message) => {
      if (!message) return;

      void callback(deserialize(message.content), () => {
        this.ack(message);
      });
    });
  };

  private ack = (message: amqp.ConsumeMessage) => {
    invariant(this.channel, ERROR_MSG_NOT_INITIALIZED);
    this.channel.ack(message);
  };
}
