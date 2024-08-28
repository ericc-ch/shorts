import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "api-schema/crackbot.reaction";
import { QueueCrackBotReaction } from "api-schema/queue";

import { api } from "./api";
import { queues } from "./queues";

const createCrackbotReaction = (body: Request) =>
  api<QueueCrackBotReaction>("/generate/crackbot/reaction", {
    body,
    method: "POST",
  });

export function useCreateCrackbotReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrackbotReaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queues.keys.all() }),
  });
}
