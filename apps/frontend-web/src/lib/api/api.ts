import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_BASE_URL_GATEWAY,
});
