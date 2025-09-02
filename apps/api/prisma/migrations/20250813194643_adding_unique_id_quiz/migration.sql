/*
  Warnings:

  - A unique constraint covering the columns `[userId,createdAt]` on the table `DailyQuiz` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DailyQuiz" ADD COLUMN     "totalQuestions" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "attempted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'easy',
ADD COLUMN     "solved" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "DailyQuiz_userId_createdAt_key" ON "DailyQuiz"("userId", "createdAt");
