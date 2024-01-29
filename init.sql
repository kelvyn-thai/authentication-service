CREATE DATABASE IF NOT EXISTS blogs;

USE blogs;

CREATE TABLE IF NOT EXISTS `users` (
  `id` CHAR(36) NOT NULL  COMMENT 'User ID',
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
  `date_of_birth` timestamp NULL DEFAULT NULL COMMENT 'User date of birth',
  `role` enum('Guest', 'Partner', 'Admin') NULL DEFAULT 'Guest' COMMENT 'User claim role',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
)

-- CREATE TABLE IF NOT EXISTS `files` (
--   `id` CHAR(36) NOT NULL  COMMENT 'File ID',
--   `name` varchar(256) NOT NULL COMMENT 'File Name',
--   `size` int NOT NULL COMMENT 'File size',
--   `type` varchar(16) NOT NULL COMMENT 'File type',
--   `url` varchar(512) NOT NULL COMMENT 'File URL',
--   `captions` varchar(256) DEFAULT NULL COMMENT 'File captions',
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created file',
--   `updated_at` timestamp NULL COMMENT 'Time updated file',
--   `deleted_at` timestamp NULL COMMENT 'Time deleted file',
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `id` (`id`)
-- )
--
--
-- CREATE TABLE IF NOT EXISTS `posts` (
--   `id` CHAR(36) NOT NULL  COMMENT 'Unique post ID',
--   `title` nvarchar(64) NOT NULL COMMENT 'Post title',
--   `description` text NOT NULL COMMENT 'Post description',
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created post',
--   `updated_at` timestamp NULL COMMENT 'Time updated post',
--   `deleted_at` timestamp NULL COMMENT 'Time deleted post',
--   `authorID` CHAR(36) NOT NULL COMMENT 'User''s post ID',
--   `status` enum('Draft','Pending','Activate') NOT NULL DEFAULT 'Draft' COMMENT 'Status of Post',
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `id` (`id`),
--   KEY `authorID` (`authorID`),
--   CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `users` (`id`)
-- ) 
--
-- CREATE TABLE IF NOT EXISTS `post_images` (
--   `postID` CHAR(36) NOT NULL COMMENT 'Post image of post',
--   `imageID` CHAR(36) NOT NULL COMMENT 'Images of post',
--   `type` enum('Main','Others','Thumbnail','Logo') DEFAULT NULL COMMENT 'Post image type',
--   PRIMARY KEY (`postID`,`imageID`),
--   KEY `imageID` (`imageID`),
--   CONSTRAINT `post_images_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`),
--   CONSTRAINT `post_images_ibfk_2` FOREIGN KEY (`imageID`) REFERENCES `files` (`id`)
-- ) 
--
-- CREATE TABLE IF NOT EXISTS `comments` (
--   `id` CHAR(36) NOT NULL  COMMENT 'Unique comments ID',
--   `description` text NOT NULL COMMENT 'comments''s description',
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created comments',
--   `updated_at` timestamp NULL COMMENT 'Time updated comments',
--   `deleted_at` timestamp NULL COMMENT 'Time deleted comments',
--   `userID` CHAR(36) NOT NULL,
--   `postID` CHAR(36) NOT NULL,
--   `parentCommentID` CHAR(36) DEFAULT NULL COMMENT 'Parent comment ID',
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `id` (`id`),
--   KEY `userID` (`userID`),
--   KEY `postID` (`postID`),
--   KEY `parentCommentID` (`parentCommentID`),
--   CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
--   CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`),
--   CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parentCommentID`) REFERENCES `comments` (`id`) ON DELETE CASCADE
-- ) 
--
--
