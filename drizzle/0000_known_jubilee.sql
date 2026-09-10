CREATE TABLE `aula_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aula_users_email` ON `aula_users` (`email`);--> statement-breakpoint
CREATE TABLE `aula_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_sessions_expires` ON `aula_sessions` (`expires`);--> statement-breakpoint
CREATE TABLE `aula_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`hits` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `aula_classrooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`teacher_id` text NOT NULL,
	`code` text NOT NULL,
	`joining` integer DEFAULT 1 NOT NULL,
	`access` text NOT NULL,
	`created` integer NOT NULL,
	FOREIGN KEY (`teacher_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aula_classrooms_code` ON `aula_classrooms` (`code`);--> statement-breakpoint
CREATE INDEX `idx_aula_classrooms_teacher` ON `aula_classrooms` (`teacher_id`);--> statement-breakpoint
CREATE TABLE `aula_members` (
	`class_id` text NOT NULL,
	`user_id` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`joined` integer NOT NULL,
	PRIMARY KEY(`class_id`, `user_id`),
	FOREIGN KEY (`class_id`) REFERENCES `aula_classrooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_members_user` ON `aula_members` (`user_id`,`active`);--> statement-breakpoint
CREATE TABLE `aula_resources` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`material` text,
	`settings` text DEFAULT '{}' NOT NULL,
	`enabled` integer DEFAULT 0 NOT NULL,
	`due` integer,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	FOREIGN KEY (`class_id`) REFERENCES `aula_classrooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_resources_class` ON `aula_resources` (`class_id`,`kind`,`created`);--> statement-breakpoint
CREATE TABLE `aula_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`resource_id` text NOT NULL,
	`user_id` text NOT NULL,
	`body` text NOT NULL,
	`grade` integer,
	`feedback` text DEFAULT '' NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	FOREIGN KEY (`resource_id`) REFERENCES `aula_resources`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aula_submissions_resource_user` ON `aula_submissions` (`resource_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `aula_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resource_id` text NOT NULL,
	`user_id` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL,
	FOREIGN KEY (`resource_id`) REFERENCES `aula_resources`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_messages_resource_id` ON `aula_messages` (`resource_id`,`id`);--> statement-breakpoint
CREATE TABLE `aula_files` (
	`id` text PRIMARY KEY NOT NULL,
	`resource_id` text NOT NULL,
	`submission_id` text,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`created` integer NOT NULL,
	FOREIGN KEY (`resource_id`) REFERENCES `aula_resources`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`submission_id`) REFERENCES `aula_submissions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`owner_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_files_resource` ON `aula_files` (`resource_id`);--> statement-breakpoint
CREATE TABLE `aula_conferences` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` text NOT NULL,
	`title` text NOT NULL,
	`state` text NOT NULL,
	`created` integer NOT NULL,
	`ended` integer,
	FOREIGN KEY (`class_id`) REFERENCES `aula_classrooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_conferences_class` ON `aula_conferences` (`class_id`,`created`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aula_conferences_active` ON `aula_conferences` (`class_id`) WHERE "aula_conferences"."state" = 'active';--> statement-breakpoint
CREATE TABLE `aula_peers` (
	`id` text PRIMARY KEY NOT NULL,
	`conference_id` text NOT NULL,
	`user_id` text NOT NULL,
	`seen` integer NOT NULL,
	FOREIGN KEY (`conference_id`) REFERENCES `aula_conferences`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `aula_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aula_peers_user` ON `aula_peers` (`conference_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `idx_aula_peers_conference` ON `aula_peers` (`conference_id`,`seen`);--> statement-breakpoint
CREATE TABLE `aula_signals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`conference_id` text NOT NULL,
	`sender` text NOT NULL,
	`receiver` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL,
	FOREIGN KEY (`conference_id`) REFERENCES `aula_conferences`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_aula_signals_receiver` ON `aula_signals` (`conference_id`,`receiver`,`id`);