import consola from "consola";
import { safeDestr } from "destr";

interface Options {
  fn: () => string | Promise<string>;
  retries: number;
}

export const retryParse = async ({ fn, retries }: Options) => {
  for (let i = 0; i < retries; i++) {
    try {
      consola.info(`Parsing JSON: attempt ${i + 1}/${retries}`);
      const jsonString = await fn();
      const result = safeDestr(jsonString);

      return result;
    } catch (e) {
      if (i < retries) {
        consola.warn(`Failed to parse JSON: ${e}`);
      } else {
        throw e;
      }
    }
  }
};
