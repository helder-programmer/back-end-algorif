-- DropForeignKey
ALTER TABLE `tb_submissions` DROP FOREIGN KEY `tb_submissions_questionId__fkey`;

-- AddForeignKey
ALTER TABLE `tb_submissions` ADD CONSTRAINT `tb_submissions_questionId__fkey` FOREIGN KEY (`questionId_`) REFERENCES `tb_questions`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;
