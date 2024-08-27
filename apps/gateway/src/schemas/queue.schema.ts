import type {
  Metadata,
  Queue,
  RenderOptions,
  VIDEO_TYPE,
} from "api-schema/queue";
import { sql } from "drizzle-orm";

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Queue table
export const queueTable = sqliteTable("queue", {
  id: integer("id").primaryKey(),
  type: integer("type").notNull().$type<VIDEO_TYPE>(),

  isRendered: integer("is_rendered", { mode: "boolean" }).notNull(),
  isScriptGenerated: integer("is_script_generated", {
    mode: "boolean",
  }).notNull(),
  isUploaded: integer("is_uploaded", { mode: "boolean" }).notNull(),

  payload: text("payload", { mode: "json" })
    .notNull()
    .$type<Queue["payload"]>(),
  renderOptions: text("render_options", { mode: "json" })
    .notNull()
    .$type<RenderOptions>(),

  metadata: text("metadata", { mode: "json" }).$type<Metadata>(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
