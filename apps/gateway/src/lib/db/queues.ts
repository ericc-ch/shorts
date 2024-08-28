import { queueTable } from "@/schemas";
import { desc, eq, inArray } from "drizzle-orm";

import { db } from "../db";

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

export function markAsUploadedQueue(
  ids: Array<number>,
  queue: Partial<typeof queueTable.$inferInsert>,
) {
  return db
    .update(queueTable)
    .set(queue)
    .where(inArray(queueTable.id, ids))
    .returning();
}
