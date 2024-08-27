import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "@/schemas";
import { DB_PATH } from "../paths";

const connection = new Database(DB_PATH);

export const db = drizzle(connection, { schema });
