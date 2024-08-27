import { join } from "pathe";

export const DB_PATH = join(import.meta.dir, "../../database.db");
export const DRIZZLE_PATH = join(import.meta.dir, "../../drizzle");
