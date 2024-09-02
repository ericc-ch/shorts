import { defineConfig } from "drizzle-kit";

// Using npx because of this issue
// https://github.com/oven-sh/bun/issues/7343

export default defineConfig({
  dbCredentials: {
    url: `file:./database.db`,
  },
  dialect: "sqlite",
  out: "./drizzle",
  schema: "../../packages/schema/src/db-schema/*",
});
