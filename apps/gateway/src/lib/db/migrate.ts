import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { DRIZZLE_PATH } from "../paths";
import { db } from "./db";
import consola from "consola";

migrate(db, { migrationsFolder: DRIZZLE_PATH });
consola.success(`Migration successful!`);
