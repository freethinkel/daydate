CREATE TABLE `budget` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`date` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `transactions` ADD `categoryId` integer REFERENCES budget(id);