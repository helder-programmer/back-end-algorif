/*
  Warnings:

  - You are about to drop the column `difficultyName` on the `tb_question_difficulties` table. All the data in the column will be lost.
  - You are about to drop the column `detailedDescription` on the `tb_questions` table. All the data in the column will be lost.
  - You are about to drop the column `difficultyId_` on the `tb_questions` table. All the data in the column will be lost.
  - You are about to drop the column `groupId_` on the `tb_questions` table. All the data in the column will be lost.
  - You are about to drop the column `testId_` on the `tb_questions` table. All the data in the column will be lost.
  - You are about to drop the column `topicId_` on the `tb_questions` table. All the data in the column will be lost.
  - You are about to drop the column `userCreatorId_` on the `tb_questions` table. All the data in the column will be lost.
  - The primary key for the `tb_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId_` on the `tb_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `userId_` on the `tb_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `groupId_` on the `tb_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topic_id]` on the table `tb_questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[difficulty_id]` on the table `tb_questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_creator_id]` on the table `tb_questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `difficulty_name` to the `tb_question_difficulties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `tb_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailed_description` to the `tb_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty_id` to the `tb_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_id` to the `tb_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_id` to the `tb_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_creator_id` to the `tb_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_id` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_difficultyId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_groupId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_testId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_topicId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_userCreatorId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_questionId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_userId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_users` DROP FOREIGN KEY `tb_users_groupId__fkey`;

-- AlterTable
ALTER TABLE `tb_question_difficulties` DROP COLUMN `difficultyName`,
    ADD COLUMN `difficulty_name` ENUM('BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT') NOT NULL;

-- AlterTable
ALTER TABLE `tb_questions` DROP COLUMN `detailedDescription`,
    DROP COLUMN `difficultyId_`,
    DROP COLUMN `groupId_`,
    DROP COLUMN `testId_`,
    DROP COLUMN `topicId_`,
    DROP COLUMN `userCreatorId_`,
    ADD COLUMN `class_id` INTEGER NOT NULL,
    ADD COLUMN `detailed_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `difficulty_id` INTEGER NOT NULL,
    ADD COLUMN `test_id` INTEGER NOT NULL,
    ADD COLUMN `topic_id` INTEGER NOT NULL,
    ADD COLUMN `user_creator_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_submissions` DROP PRIMARY KEY,
    DROP COLUMN `questionId_`,
    DROP COLUMN `userId_`,
    ADD COLUMN `question_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `question_id`);

-- AlterTable
ALTER TABLE `tb_users` DROP COLUMN `groupId_`,
    ADD COLUMN `class_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tb_questions_topic_id_key` ON `tb_questions`(`topic_id`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_questions_difficulty_id_key` ON `tb_questions`(`difficulty_id`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_questions_user_creator_id_key` ON `tb_questions`(`user_creator_id`);

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tb_question_tests`(`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_topic_id_fkey` FOREIGN KEY (`topic_id`) REFERENCES `tb_question_topics`(`topic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_user_creator_id_fkey` FOREIGN KEY (`user_creator_id`) REFERENCES `tb_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_difficulty_id_fkey` FOREIGN KEY (`difficulty_id`) REFERENCES `tb_question_difficulties`(`difficulty_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tb_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `tb_questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
