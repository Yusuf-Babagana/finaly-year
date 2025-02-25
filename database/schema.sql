CREATE DATABASE course_management_db;
USE course_management_db;

CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL UNIQUE,
  `email` varchar(60) NOT NULL UNIQUE,
  `role_id` int NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE RESTRICT
);

CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(5) NOT NULL,
  `name` tinytext NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `syllabuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `semester` int NOT NULL,
  `dept_id` int NOT NULL,
  `scheme` int NOT NULL,
  `pdf_link` varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (`id`),
  UNIQUE (`semester`, `dept_id`, `scheme`),
  CONSTRAINT `syllabus_dept_id` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
);

CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `semester` int NOT NULL,
  `name` tinytext NOT NULL,
  `syllabus_id` int,
  PRIMARY KEY (`id`),
  CONSTRAINT `syllabus_id` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabuses` (`id`) ON DELETE SET NULL
);

CREATE TABLE `department_subjects` (
  `dept_id` int NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`dept_id`,`subject_id`),
  CONSTRAINT `dept_id` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sub_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE RESTRICT
);

CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `subject_id` int NOT NULL,
  `module_no` int NOT NULL,
  `link` varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (`id`),
  CONSTRAINT `notes_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE
);

CREATE TABLE `bookmarks` (
  `user_id` int NOT NULL,
  `note_id` int NOT NULL,
  PRIMARY KEY (`note_id`, `user_id`),
  CONSTRAINT `bookmark_note_id` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookmark_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `notes_tags` (
  `note_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`note_id`,`tag_id`),
  CONSTRAINT `tag_note_id` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tag_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE RESTRICT
);

CREATE TABLE `question_papers` (
  `year` int NOT NULL,
  `subject_id` int NOT NULL,
  `scheme` int NOT NULL,
  `link` varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (`year`,`subject_id`, `scheme`),
  CONSTRAINT `qp_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE
);

CREATE TABLE `test_papers` (
  `subject_id` INT NOT NULL,
  `dept_id` INT NOT NULL, 
  `test_number` INT NOT NULL, 
  `year` INT NOT NULL, 
  `link` varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (`subject_id`, `dept_id`, `test_number`, `year`),
  CONSTRAINT `tp_sub_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tp_dept_id` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
);

CREATE TABLE `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
);

DELIMITER $$

CREATE PROCEDURE `delete_unoffered_subjects`()
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
BEGIN
  DELETE FROM subjects WHERE id NOT IN (SELECT subject_id FROM department_subjects);
END $$

CREATE TRIGGER `dept_deletion` 
AFTER DELETE ON departments 
FOR EACH ROW BEGIN 
  CALL delete_unoffered_subjects(); 
END $$

CREATE PROCEDURE `delete_unused_tags`()
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
BEGIN
  DELETE FROM tags WHERE id NOT IN (SELECT tag_id FROM notes_tags);
END $$

CREATE TRIGGER `note_deletion` 
AFTER DELETE ON notes 
FOR EACH ROW BEGIN 
  CALL delete_unused_tags(); 
END $$

DELIMITER ;
