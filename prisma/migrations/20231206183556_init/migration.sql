/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `reaction` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `like` ADD COLUMN `reaction` ENUM('Love', 'Like', 'Angery', 'HaHa', 'Care', 'Sad') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('User', 'Admin') NOT NULL DEFAULT 'User';
