/*
  Warnings:

  - Added the required column `groupId_` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_users` ADD COLUMN `groupId_` INTEGER NOT NULL,
    MODIFY `score` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `tb_question_groups` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_question_topics` (
    `topic_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`topic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_question_tests` (
    `test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `input` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_question_difficulties` (
    `difficulty_id` INTEGER NOT NULL AUTO_INCREMENT,
    `difficultyName` ENUM('BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`difficulty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `detailedDescription` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `groupId_` INTEGER NOT NULL,
    `testId_` INTEGER NOT NULL,
    `topicId_` INTEGER NOT NULL,
    `difficultyId_` INTEGER NOT NULL,
    `userCreatorId_` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_questions_title_key`(`title`),
    UNIQUE INDEX `tb_questions_topicId__key`(`topicId_`),
    UNIQUE INDEX `tb_questions_difficultyId__key`(`difficultyId_`),
    UNIQUE INDEX `tb_questions_userCreatorId__key`(`userCreatorId_`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_submissions` (
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId_` VARCHAR(191) NOT NULL,
    `questionId_` INTEGER NOT NULL,

    PRIMARY KEY (`userId_`, `questionId_`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_groupId__fkey` FOREIGN KEY (`groupId_`) REFERENCES `tb_question_groups`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_testId__fkey` FOREIGN KEY (`testId_`) REFERENCES `tb_question_tests`(`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_groupId__fkey` FOREIGN KEY (`groupId_`) REFERENCES `tb_question_groups`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_topicId__fkey` FOREIGN KEY (`topicId_`) REFERENCES `tb_question_topics`(`topic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_userCreatorId__fkey` FOREIGN KEY (`userCreatorId_`) REFERENCES `tb_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_difficultyId__fkey` FOREIGN KEY (`difficultyId_`) REFERENCES `tb_question_difficulties`(`difficulty_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_userId__fkey` FOREIGN KEY (`userId_`) REFERENCES `tb_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_questionId__fkey` FOREIGN KEY (`questionId_`) REFERENCES `tb_questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
