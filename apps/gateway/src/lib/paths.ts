import { join } from "pathe";
import { DATABASE_DIR } from "./env";

export const DB_PATH = join(DATABASE_DIR, "database.db");
export const DRIZZLE_PATH = join(import.meta.dir, "../../drizzle");
