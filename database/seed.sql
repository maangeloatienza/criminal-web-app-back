CREATE DATABASE IF NOT EXISTS criminal_watch_db;

ALTER DATABASE criminal_watch_db CHARACTER SET utf32 COLLATE utf32_general_ci;

USE criminal_watch_db;

CREATE TABLE roles (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `created` DATETIME DEFAULT NULL,
  `updated` DATETIME DEFAULT NULL,
  `deleted` DATETIME DEFAULT NULL
);

CREATE TABLE users (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `role_id` VARCHAR(64) NULL,
  `first_name` VARCHAR(50)  NOT NULL,
  `last_name` VARCHAR(50)  NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50)  NOT NULL,
  `password` VARCHAR(64)  NOT NULL,
  `phone_number` VARCHAR(11)  NULL,
  `created` DATETIME  NULL,
  `updated` DATETIME  NULL
);

ALTER TABLE users ADD CONSTRAINT FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`);
