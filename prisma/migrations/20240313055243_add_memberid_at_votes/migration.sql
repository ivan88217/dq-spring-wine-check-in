/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vote` ADD COLUMN `memberId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Vote_memberId_key` ON `Vote`(`memberId`);

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
