/*
  Warnings:

  - You are about to drop the column `difficulty_name` on the `tb_question_difficulties` table. All the data in the column will be lost.
  - Added the required column `name` to the `tb_question_difficulties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_question_difficulties` DROP COLUMN `difficulty_name`,
    ADD COLUMN `name` ENUM('BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT') NOT NULL;
