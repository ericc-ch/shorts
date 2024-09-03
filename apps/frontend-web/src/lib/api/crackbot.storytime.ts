import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PayloadCrackBotReaction, Queue } from "schema";

import { api } from "./api";
import { queues } from "./queues";

const createCrackbotStory = (body: PayloadCrackBotReaction) =>
  api<Queue>("/generate/crackbot/story", {
    body,
    method: "POST",
  });

export function useCreateCrackbotStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrackbotStory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queues.keys.all() }),
  });
}
