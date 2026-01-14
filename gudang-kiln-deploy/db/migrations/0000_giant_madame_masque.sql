CREATE TABLE `app_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`primary_color` text DEFAULT '#c2410c' NOT NULL,
	`sidebar_color` text DEFAULT '#171717' NOT NULL,
	`app_name` text DEFAULT 'Gudang Kiln' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `materials` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`min_stock` integer DEFAULT 0 NOT NULL,
	`current_stock` integer DEFAULT 0 NOT NULL,
	`category` text NOT NULL,
	`warehouse_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `materials_code_unique` ON `materials` (`code`);--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`material_id` text NOT NULL,
	`warehouse_id` text NOT NULL,
	`qty` integer NOT NULL,
	`date` integer NOT NULL,
	`operator` text NOT NULL,
	`section` text NOT NULL,
	`purpose` text NOT NULL,
	`note` text,
	FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`role` text NOT NULL,
	`pin_hash` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `warehouses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
