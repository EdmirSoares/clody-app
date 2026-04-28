import { desc, eq } from "drizzle-orm";
import { db, recentLocationsTable, type NewRecentLocation, type RecentLocation } from "@shared/lib/db";

const MAX_RECENT = 2;

export async function getRecentLocations(): Promise<RecentLocation[]> {
  return db
    .select()
    .from(recentLocationsTable)
    .orderBy(desc(recentLocationsTable.searchedAt))
    .limit(MAX_RECENT);
}

export async function upsertRecentLocation(entry: Omit<NewRecentLocation, "id" | "searchedAt">): Promise<void> {
  const existing = await db
    .select()
    .from(recentLocationsTable)
    .where(eq(recentLocationsTable.name, entry.name))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(recentLocationsTable)
      .set({ ...entry, searchedAt: Date.now() })
      .where(eq(recentLocationsTable.name, entry.name));
    return;
  }

  const all = await db
    .select()
    .from(recentLocationsTable)
    .orderBy(desc(recentLocationsTable.searchedAt));

  if (all.length >= MAX_RECENT) {
    const oldest = all[all.length - 1];
    await db.delete(recentLocationsTable).where(eq(recentLocationsTable.id, oldest.id!));
  }

  await db.insert(recentLocationsTable).values({ ...entry, searchedAt: Date.now() });
}
