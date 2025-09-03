/*
  Warnings:

  - Added the required column `difficulty` to the `UserTopicPerformance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTopicPerformance" ADD COLUMN     "difficulty" "QuestionDifficulty" NOT NULL;

-- CreateTable
CREATE TABLE "DailyQuiz" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "DailyQuiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyQuiz" ADD CONSTRAINT "DailyQuiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
