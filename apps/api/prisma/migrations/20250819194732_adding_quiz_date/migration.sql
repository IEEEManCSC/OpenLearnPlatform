/*
  Warnings:

  - A unique constraint covering the columns `[userId,quizDate]` on the table `DailyQuiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quizDate` to the `DailyQuiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DailyQuiz_userId_createdAt_key";

-- AlterTable
ALTER TABLE "DailyQuiz" ADD COLUMN     "quizDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DailyQuiz_userId_quizDate_key" ON "DailyQuiz"("userId", "quizDate");
