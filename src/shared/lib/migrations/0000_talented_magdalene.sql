CREATE TABLE IF NOT EXISTS `recent_locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`state` text,
	`country` text NOT NULL,
	`lat` real NOT NULL,
	`lon` real NOT NULL,
	`icon_code` text NOT NULL,
	`temp` integer NOT NULL,
	`weather_description` text NOT NULL,
	`aqi` integer NOT NULL,
	`co` real NOT NULL,
	`searched_at` integer NOT NULL
);
