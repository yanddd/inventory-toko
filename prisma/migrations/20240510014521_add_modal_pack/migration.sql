/*
  Warnings:

  - You are about to alter the column `updated_at` on the `items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `brand` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `code_modal_pack` CHAR(3) NOT NULL DEFAULT '-',
    ADD COLUMN `modal_pack` INTEGER NOT NULL DEFAULT 0,
    MODIFY `modal` INTEGER NOT NULL DEFAULT 0,
    MODIFY `code_modal` CHAR(3) NOT NULL DEFAULT '-',
    MODIFY `price` INTEGER NOT NULL DEFAULT 0,
    MODIFY `brand` VARCHAR(100) NOT NULL DEFAULT '-',
    MODIFY `stock` INTEGER NOT NULL DEFAULT 0,
    MODIFY `updated_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `updated_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;
