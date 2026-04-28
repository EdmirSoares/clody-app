import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./migrations/migrations";

export { recentLocationsTable } from "./schema";
export type { RecentLocation, NewRecentLocation } from "./schema";

const sqlite = SQLite.openDatabaseSync("clody.db");

export const db = drizzle(sqlite);

export { useMigrations, migrations };
