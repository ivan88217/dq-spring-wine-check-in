-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
