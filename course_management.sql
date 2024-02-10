CREATE DATABASE course_management_db;
USE course_management_db;

CREATE TABLE `bookmarks` (
  `user_id` int NOT NULL,
  `note_id` int NOT NULL,
  PRIMARY KEY (`note_id`, `user_id`),
  -- KEY `bookmark_note_id` (`note_id`),
  -- KEY `bookmark_user_id` (`user_id`),
  CONSTRAINT `bookmark_note_id` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`),
  CONSTRAINT `bookmark_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `departments` (
  `id` int NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` tinytext NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `department_subjects` (
  `dept_id` int NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`dept_id`,`subject_id`),
  KEY `sub_id` (`subject_id`),
  CONSTRAINT `dept_id` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `sub_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
);

CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `subject_id` int NOT NULL,
  `module_no` int NOT NULL,
  `link` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  -- KEY `notes_subject_id` (`subject_id`),
  CONSTRAINT `notes_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
);

CREATE TABLE `notes_tags` (
  `note_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`note_id`,`tag_id`),
  -- KEY `tag_id` (`tag_id`),
  CONSTRAINT `tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `tag_note_id` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`)
);

CREATE TABLE `question_papers` (
  `year` int NOT NULL,
  `subject_id` int NOT NULL,
  `scheme` int NOT NULL,
  `link` varchar(50) NOT NULL,
  PRIMARY KEY (`year`,`subject_id`, `scheme`),
  -- KEY `qp_subject_id` (`subject_id`),
  CONSTRAINT `qp_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
);

CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`)
);

CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `expires` datetime NOT NULL,
  PRIMARY KEY (`id`),
  -- KEY `session_user_id` (`user_id`),
  CONSTRAINT `session_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `semester` int NOT NULL,
  `name` tinytext NOT NULL,
  `syllabus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `syllabus_id` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabuses` (`id`)
);

CREATE TABLE `syllabuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `semester` int NOT NULL,
  `dept_id` int NOT NULL,
  `scheme` int NOT NULL,
  `pdf_link` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`semester`, `dept_id`, `scheme`),
  CONSTRAINT `syllabus_dept_id` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`)
);

CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL UNIQUE,
  `usn` varchar(10),
  `email` varchar(60) NOT NULL UNIQUE,
  `role_id` int NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  -- KEY `user_role_id` (`role_id`),
  CONSTRAINT `user_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
);