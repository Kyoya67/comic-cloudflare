CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`comic_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`comic_id`) REFERENCES `comics`(`id`) ON UPDATE no action ON DELETE no action
);
