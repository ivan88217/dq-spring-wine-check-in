/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `CheckIn` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CheckIn_memberId_key` ON `CheckIn`(`memberId`);
