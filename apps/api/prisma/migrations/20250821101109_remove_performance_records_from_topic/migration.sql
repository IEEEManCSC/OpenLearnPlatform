/*
  Warnings:

  - You are about to drop the column `attempted` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `solved` on the `Topic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "attempted",
DROP COLUMN "difficulty",
DROP COLUMN "solved";
