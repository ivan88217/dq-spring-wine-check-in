/*
  Warnings:

  - Added the required column `email` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CheckIn` DROP FOREIGN KEY `CheckIn_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberPrize` DROP FOREIGN KEY `MemberPrize_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberPrize` DROP FOREIGN KEY `MemberPrize_prizeId_fkey`;

-- DropForeignKey
ALTER TABLE `PrizePoolMember` DROP FOREIGN KEY `PrizePoolMember_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `PrizePoolMember` DROP FOREIGN KEY `PrizePoolMember_prizePoolId_fkey`;

-- AlterTable
ALTER TABLE `Member` ADD COLUMN `email` VARCHAR(128) NOT NULL;

-- AddForeignKey
ALTER TABLE `PrizePoolMember` ADD CONSTRAINT `PrizePoolMember_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrizePoolMember` ADD CONSTRAINT `PrizePoolMember_prizePoolId_fkey` FOREIGN KEY (`prizePoolId`) REFERENCES `PrizePool`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckIn` ADD CONSTRAINT `CheckIn_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberPrize` ADD CONSTRAINT `MemberPrize_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberPrize` ADD CONSTRAINT `MemberPrize_prizeId_fkey` FOREIGN KEY (`prizeId`) REFERENCES `Prize`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
