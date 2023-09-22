/*
  Warnings:

  - You are about to drop the column `teacher` on the `tb_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_users` DROP COLUMN `teacher`,
    ADD COLUMN `classId_` VARCHAR(191) NULL,
    ADD COLUMN `is_teacher` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `score` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `tb_classes` (
    `class_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_question_topics` (
    `topic_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`topic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_question_tests` (
    `test_id` VARCHAR(191) NOT NULL,
    `input` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `question_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_question_difficulties` (
    `difficulty_id` VARCHAR(191) NOT NULL,
    `difficulty_name` ENUM('BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`difficulty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_questions` (
    `question_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `detailed_description` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `class_id` VARCHAR(191) NULL,
    `topic_id` VARCHAR(191) NOT NULL,
    `difficulty_id` VARCHAR(191) NOT NULL,
    `user_creator_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_questions_title_key`(`title`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_submissions` (
    `userId_` VARCHAR(191) NOT NULL,
    `questionId_` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `is_correct_code` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId_`, `questionId_`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_classId__fkey` FOREIGN KEY (`classId_`) REFERENCES `tb_classes`(`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_question_tests` ADD CONSTRAINT `tb_question_tests_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `tb_questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_topic_id_fkey` FOREIGN KEY (`topic_id`) REFERENCES `tb_question_topics`(`topic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_user_creator_id_fkey` FOREIGN KEY (`user_creator_id`) REFERENCES `tb_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_difficulty_id_fkey` FOREIGN KEY (`difficulty_id`) REFERENCES `tb_question_difficulties`(`difficulty_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_userId__fkey` FOREIGN KEY (`userId_`) REFERENCES `tb_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_questionId__fkey` FOREIGN KEY (`questionId_`) REFERENCES `tb_questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
