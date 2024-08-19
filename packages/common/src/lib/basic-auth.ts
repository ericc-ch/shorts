import { encodeBase64 } from "@std/encoding";

export const basicAuth = (username: string, password: string) => {
  return encodeBase64(`${username}:${password}`);
};
