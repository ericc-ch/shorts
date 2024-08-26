import type { Queue, QueueBase } from "api-schema/queue";

import amqp from "amqplib";

import { deserialize, serialize } from "./lib/serializer";
import { QUEUE } from "./types";

type InitOptions = {
  prefetch?: number;
  queue: QUEUE;
};

export class MessageQueue {
  private ack = (queue: QUEUE, message: amqp.ConsumeMessage) => {
    const channel = this.getChannel(queue);
    channel.ack(message);
  };
  private channels: Map<QUEUE, amqp.Channel> = new Map();

  private connection: amqp.Connection;

  private getChannel = (queue: QUEUE) => {
    if (!this.channels.has(queue))
      throw new Error(`Connection for ${queue} not initialized`);

    return this.channels.get(queue) as amqp.Channel;
  };

  public consume = (
    queue: QUEUE,
    callback: (data: Queue, ack: () => void) => Promise<void> | void,
  ) => {
    const channel = this.getChannel(queue);
    return channel.consume(queue, (message) => {
      if (!message) return;

      void callback(deserialize(message.content), () =>
        this.ack(queue, message),
      );
    });
  };

  public init = async ({ prefetch = 1, queue }: InitOptions) => {
    const channel = await this.connection.createChannel();
    this.channels.set(queue, channel);

    await channel.assertQueue(queue);
    await channel.prefetch(prefetch);

    return this;
  };

  public send = (queue: QUEUE, data: QueueBase) => {
    const channel = this.getChannel(queue);

    const serialized = serialize(data);
    channel.sendToQueue(queue, serialized);
  };

  constructor(connection: amqp.Connection) {
    this.connection = connection;
  }
}
