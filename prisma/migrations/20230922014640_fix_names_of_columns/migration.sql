/*
  Warnings:

  - The primary key for the `tb_classes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `tb_classes` table. All the data in the column will be lost.
  - Added the required column `class_id` to the `tb_classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_questions` DROP FOREIGN KEY `tb_questions_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_users` DROP FOREIGN KEY `tb_users_class_id_fkey`;

-- AlterTable
ALTER TABLE `tb_classes` DROP PRIMARY KEY,
    DROP COLUMN `group_id`,
    ADD COLUMN `class_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`class_id`);

-- AddForeignKey
ALTER TABLE `tb_users` ADD CONSTRAINT `tb_users_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `tb_questions_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `tb_classes`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
