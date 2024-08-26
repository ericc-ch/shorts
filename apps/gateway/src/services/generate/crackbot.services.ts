import { type Request, type Response } from "api-schema/crackbot.reaction";

import { api } from "../api";

export function generateCrackbotReaction(body: Request) {
  return api<Response>(`/crackbot/reaction`, {
    body,
    method: "POST",
  });
}
