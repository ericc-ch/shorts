import { BASE_URL_SCRIPT_GEN } from "@/lib/env";
import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: BASE_URL_SCRIPT_GEN,
});
