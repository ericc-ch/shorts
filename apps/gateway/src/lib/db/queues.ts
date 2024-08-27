import { queueTable } from "@/schemas";

import { db } from "../db";
import { desc, eq } from "drizzle-orm";

export async function insertQueue(queue: typeof queueTable.$inferInsert) {
  const result = await db.insert(queueTable).values(queue).returning();
  return result.at(0)!;
}

export function getQueues() {
  return db.query.queueTable.findMany({
    orderBy: [desc(queueTable.createdAt)],
  });
}

export function updateQueue(
  id: number,
  queue: Partial<typeof queueTable.$inferInsert>,
) {
  return db
    .update(queueTable)
    .set(queue)
    .where(eq(queueTable.id, id))
    .returning();
}
