-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(12) NOT NULL,
    `code` VARCHAR(32) NOT NULL,
    `years` DOUBLE NOT NULL,
    `department_code` VARCHAR(16) NULL,
    `department_name` VARCHAR(32) NULL,
    `isAttend` BOOLEAN NOT NULL DEFAULT false,
    `isStay` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrizePool` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(12) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrizePoolMember` (
    `memberId` INTEGER NOT NULL,
    `prizePoolId` INTEGER NOT NULL,

    PRIMARY KEY (`memberId`, `prizePoolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckIn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prize` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(12) NOT NULL,
    `description` VARCHAR(32) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberPrize` (
    `memberId` INTEGER NOT NULL,
    `prizeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`memberId`, `prizeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrizePoolMember` ADD CONSTRAINT `PrizePoolMember_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrizePoolMember` ADD CONSTRAINT `PrizePoolMember_prizePoolId_fkey` FOREIGN KEY (`prizePoolId`) REFERENCES `PrizePool`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckIn` ADD CONSTRAINT `CheckIn_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberPrize` ADD CONSTRAINT `MemberPrize_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberPrize` ADD CONSTRAINT `MemberPrize_prizeId_fkey` FOREIGN KEY (`prizeId`) REFERENCES `Prize`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
