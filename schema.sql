-- MySQL dump 10.13  Distrib 8.0.32, for macos13 (arm64)
--
-- Host: localhost    Database: blogs
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique comment ID',
  `userId` int NOT NULL COMMENT 'User''s ID',
  `postId` int NOT NULL COMMENT 'User''s post ID',
  `parentCommentId` int DEFAULT NULL COMMENT 'Parent comment ID for hierarchical structure',
  `description` text NOT NULL COMMENT 'Comment''s description',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Comments'' created date',
  `updatedAt` timestamp NULL DEFAULT NULL COMMENT 'Comments'' updated date',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  KEY `parentCommentId` (`parentCommentId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parentCommentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_parent_comment` FOREIGN KEY (`parentCommentId`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'File ID',
  `name` varchar(256) NOT NULL COMMENT 'File Name',
  `size` int NOT NULL COMMENT 'File size',
  `type` varchar(16) NOT NULL COMMENT 'File type',
  `url` varchar(256) NOT NULL COMMENT 'File URL',
  `captions` varchar(256) DEFAULT NULL COMMENT 'File captions',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created file',
  `updatedAt` timestamp NULL DEFAULT NULL COMMENT 'Time updated file',
  `deletedAt` timestamp NULL DEFAULT NULL COMMENT 'Time deleted file',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_images`
--

DROP TABLE IF EXISTS `post_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_images` (
  `postID` int NOT NULL COMMENT 'Post image of post',
  `imageID` int NOT NULL COMMENT 'Images of post',
  `type` enum('Main','Others','Thumbnail','Logo') DEFAULT NULL COMMENT 'Post image type',
  PRIMARY KEY (`postID`,`imageID`),
  KEY `imageID` (`imageID`),
  CONSTRAINT `post_images_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`),
  CONSTRAINT `post_images_ibfk_2` FOREIGN KEY (`imageID`) REFERENCES `files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique post ID',
  `title` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Post title',
  `description` varchar(2048) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Post description',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created post',
  `updatedAt` timestamp NULL DEFAULT NULL COMMENT 'Time updated post',
  `deletedAt` timestamp NULL DEFAULT NULL COMMENT 'Time deleted post',
  `authorID` int NOT NULL COMMENT 'Author''s post ID',
  `stauts` enum('Draft','Pending','Activated','Deactivated') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_authorID_userID` (`authorID`),
  CONSTRAINT `FK_authorID_userID` FOREIGN KEY (`authorID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` int NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `username` varchar(256) NOT NULL COMMENT 'User name - use for login',
  `password` varchar(64) NOT NULL COMMENT 'User password',
  `phone` varchar(32) DEFAULT NULL COMMENT 'User phone',
  `email` varchar(256) NOT NULL COMMENT 'User email',
  `gender` enum('Male','Female','PreferNotToSay') DEFAULT NULL COMMENT 'User gender',
  `fullname` varchar(256) DEFAULT NULL COMMENT 'User fullname',
  `date_of_birth` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-23 11:02:24
