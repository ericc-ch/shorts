import { Database } from "bun:sqlite";
import consola from "consola";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { queueTable } from "schema";

import { DB_PATH, DRIZZLE_PATH } from "../paths";

const connection = new Database(DB_PATH);

const schema = {
  queueTable,
};

export const db = drizzle(connection, { schema });

// Migrate here because
// I don't think I can run it as a separate compose service
// I shouldn't run migration in Dockerfile
// I don't want the container command to have 2 process (migrate and start)
migrate(db, { migrationsFolder: DRIZZLE_PATH });
consola.success(`Migration successful!`);
