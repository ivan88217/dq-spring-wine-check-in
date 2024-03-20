/*
  Warnings:

  - You are about to drop the column `memberId` on the `Vote` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Vote_memberId_key` ON `Vote`;

-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `memberId`;
