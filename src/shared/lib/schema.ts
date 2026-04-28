import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

export const recentLocationsTable = sqliteTable("recent_locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  state: text("state"),
  country: text("country").notNull(),
  lat: real("lat").notNull(),
  lon: real("lon").notNull(),
  iconCode: text("icon_code").notNull(),
  temp: integer("temp").notNull(),
  weatherDescription: text("weather_description").notNull(),
  aqi: integer("aqi").notNull(),
  co: real("co").notNull(),
  searchedAt: integer("searched_at").notNull(),
});

export type RecentLocation = typeof recentLocationsTable.$inferSelect;
export type NewRecentLocation = typeof recentLocationsTable.$inferInsert;
