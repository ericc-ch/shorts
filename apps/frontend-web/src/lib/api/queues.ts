import { queryOptions } from "@tanstack/react-query";
import { Queue } from "api-schema/queue";

import { api } from "./api";

const getQueues = () => api<Array<Queue>>("/queues");

export const queues = {
  keys: {
    all: () => ["queues"],
    lists: () => [...queues.keys.all(), "lists"],
  },

  list: () =>
    queryOptions({
      queryFn: getQueues,
      queryKey: [...queues.keys.lists()],
    }),
};
