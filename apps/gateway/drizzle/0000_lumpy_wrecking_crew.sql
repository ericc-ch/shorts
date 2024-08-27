CREATE TABLE `queue` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` integer NOT NULL,
	`is_rendered` integer NOT NULL,
	`is_script_generated` integer NOT NULL,
	`is_uploaded` integer NOT NULL,
	`payload` text NOT NULL,
	`render_options` text NOT NULL,
	`metadata` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
