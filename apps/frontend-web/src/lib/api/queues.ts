import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Queue } from "api-schema/queue";

import { api } from "./api";

const getQueues = () => api<Array<Queue>>("/queues");
const markQueueUploaded = (ids: Array<number>) =>
  api("/queues/mark-uploaded", {
    body: {
      ids,
    },
    method: "POST",
  });

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

export function useMarkQueueUploaded() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markQueueUploaded,

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queues.keys.all() }),
  });
}
