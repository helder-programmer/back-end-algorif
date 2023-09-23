/*
  Warnings:

  - You are about to drop the `tb_question_groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_groupId__fkey`;

-- DropForeignKey
ALTER TABLE `tb_users` DROP FOREIGN KEY `tb_users_groupId__fkey`;

-- DropTable
DROP TABLE `tb_question_groups`;

-- CreateTable
CREATE TABLE `tb_classes` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_groupId__fkey` FOREIGN KEY (`groupId_`) REFERENCES `tb_classes`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_groupId__fkey` FOREIGN KEY (`groupId_`) REFERENCES `tb_classes`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
