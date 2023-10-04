/*
  Warnings:

  - The primary key for the `tb_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId_` on the `tb_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `userId_` on the `tb_submissions` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tb_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_questionId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_userId__fkey`;

-- AlterTable
ALTER TABLE `tb_submissions` DROP PRIMARY KEY,
    DROP COLUMN `questionId_`,
    DROP COLUMN `userId_`,
    ADD COLUMN `questionId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `questionId`);

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `tb_questions`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;
