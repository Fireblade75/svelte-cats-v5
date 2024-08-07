CREATE TABLE `cat` (
  `cat_id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` TEXT NOT NULL UNIQUE,
  `color` TEXT NOT NULL,
  `age` INTEGER NOT NULL
);

CREATE TABLE `user` (
    `id` INTEGER NOT NULL PRIMARY KEY,
    `username` TEXT NOT NULL UNIQUE,
    `hash` TEXT NOT NULL
);

CREATE TABLE `session` (
    `id` TEXT NOT NULL PRIMARY KEY,
    `expires_at` INTEGER NOT NULL,
    `user_id` TEXT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES user(`id`)
);