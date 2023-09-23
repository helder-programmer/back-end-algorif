/*
  Warnings:

  - The primary key for the `tb_classes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_question_difficulties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_question_tests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_question_topics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `test_id` on the `tb_questions` table. All the data in the column will be lost.
  - The primary key for the `tb_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `question_id` on the `tb_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tb_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `tb_users` table. All the data in the column will be lost.
  - Added the required column `question_id` to the `tb_question_tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_correct_code` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId_` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId_` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_difficulty_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_topic_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_users` DROP FOREIGN KEY `tb_users_class_id_fkey`;

-- AlterTable
ALTER TABLE `tb_classes` DROP PRIMARY KEY,
    MODIFY `class_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`class_id`);

-- AlterTable
ALTER TABLE `tb_question_difficulties` DROP PRIMARY KEY,
    MODIFY `difficulty_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`difficulty_id`);

-- AlterTable
ALTER TABLE `tb_question_tests` DROP PRIMARY KEY,
    ADD COLUMN `question_id` VARCHAR(191) NOT NULL,
    MODIFY `test_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`test_id`);

-- AlterTable
ALTER TABLE `tb_question_topics` DROP PRIMARY KEY,
    MODIFY `topic_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`topic_id`);

-- AlterTable
ALTER TABLE `tb_questions` DROP PRIMARY KEY,
    DROP COLUMN `test_id`,
    MODIFY `question_id` VARCHAR(191) NOT NULL,
    MODIFY `class_id` VARCHAR(191) NULL,
    MODIFY `difficulty_id` VARCHAR(191) NOT NULL,
    MODIFY `topic_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`question_id`);

-- AlterTable
ALTER TABLE `tb_submissions` DROP PRIMARY KEY,
    DROP COLUMN `question_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `is_correct_code` BOOLEAN NOT NULL,
    ADD COLUMN `questionId_` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId_` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId_`, `questionId_`);

-- AlterTable
ALTER TABLE `tb_users` DROP COLUMN `teacher`,
    ADD COLUMN `is_teacher` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `class_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_question_tests` ADD CONSTRAINT `tb_question_tests_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `tb_questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_topic_id_fkey` FOREIGN KEY (`topic_id`) REFERENCES `tb_question_topics`(`topic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_difficulty_id_fkey` FOREIGN KEY (`difficulty_id`) REFERENCES `tb_question_difficulties`(`difficulty_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_userId__fkey` FOREIGN KEY (`userId_`) REFERENCES `tb_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_questionId__fkey` FOREIGN KEY (`questionId_`) REFERENCES `tb_questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
