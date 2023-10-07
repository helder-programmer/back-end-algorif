/*
  Warnings:

  - The primary key for the `tb_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId` on the `tb_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tb_submissions` table. All the data in the column will be lost.
  - Added the required column `question_id` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_userId_fkey`;

-- AlterTable
ALTER TABLE `tb_submissions` DROP PRIMARY KEY,
    DROP COLUMN `questionId`,
    DROP COLUMN `userId`,
    ADD COLUMN `question_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `question_id`);

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tb_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `tb_questions`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;
