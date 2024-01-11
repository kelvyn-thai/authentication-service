CREATE DATABASE IF NOT EXISTS blogs;

USE blogs;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `username` varchar(256)  NULL COMMENT 'User name - use for login',
  `password` varchar(64) NOT NULL COMMENT 'User password',
  `avatar` varchar(256) DEFAULT NULL COMMENT 'User image profile URL',
  `phone` varchar(32) DEFAULT NULL COMMENT 'User phone',
  `email` varchar(128) NOT NULL COMMENT 'User email',
  `gender` enum('Male','Female','PreferNotToSay') DEFAULT NULL COMMENT 'User gender',
  `fullname` varchar(256) DEFAULT NULL COMMENT 'User fullname',
  `created_at` timestamp  NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created user',
  `updated_at` timestamp NULL COMMENT 'Time updated user',
  `deleted_at` timestamp NULL COMMENT 'Time deleted user',
  `date_of_birth` timestamp NULL DEFAULT NULL COMMENT 'User date of birth'
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `files` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'File ID',
  `name` varchar(256) NOT NULL COMMENT 'File Name',
  `size` int NOT NULL COMMENT 'File size',
  `type` varchar(16) NOT NULL COMMENT 'File type',
  `url` varchar(512) NOT NULL COMMENT 'File URL',
  `captions` varchar(256) DEFAULT NULL COMMENT 'File captions',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created file',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'Time updated file',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Time deleted file',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique post ID',
  `title` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Post title',
  `description` text NOT NULL COMMENT 'Post description',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created post',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'Time updated post',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Time deleted post',
  `authorID` int NOT NULL COMMENT 'User''s post ID',
  `status` enum('Draft','Pending','Activate') NOT NULL COMMENT 'Status of Post',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `authorID` (`authorID`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `post_images` (
  `postID` int NOT NULL COMMENT 'Post image of post',
  `imageID` int NOT NULL COMMENT 'Images of post',
  `type` enum('Main','Others','Thumbnail','Logo') DEFAULT NULL COMMENT 'Post image type',
  PRIMARY KEY (`postID`,`imageID`),
  KEY `imageID` (`imageID`),
  CONSTRAINT `post_images_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`),
  CONSTRAINT `post_images_ibfk_2` FOREIGN KEY (`imageID`) REFERENCES `files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique comments ID',
  `description` text NOT NULL COMMENT 'comments''s description',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created comments',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'Time updated comments',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Time deleted comments',
  `userID` int DEFAULT NULL,
  `postID` int DEFAULT NULL,
  `parentCommentID` int DEFAULT NULL COMMENT 'Parent comment ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userID` (`userID`),
  KEY `postID` (`postID`),
  KEY `parentCommentID` (`parentCommentID`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`),
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parentCommentID`) REFERENCES `comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



