/*
  Warnings:

  - You are about to alter the column `value` on the `ServerOption` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `ServerOption` MODIFY `value` BOOLEAN NOT NULL;
