import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PayloadCrackBotReaction, Queue } from "schema";

import { api } from "./api";
import { queues } from "./queues";

const createCrackbotReaction = (body: PayloadCrackBotReaction) =>
  api<Queue>("/generate/crackbot/reaction", {
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
