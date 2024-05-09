/*
  Warnings:

  - You are about to drop the column `category` on the `items` table. All the data in the column will be lost.
  - You are about to alter the column `updated_at` on the `items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `category_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_category_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `category`,
    ADD COLUMN `category_id` VARCHAR(100) NOT NULL,
    MODIFY `updated_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `updated_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
