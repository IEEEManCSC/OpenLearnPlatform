// Local prisma client
import { prisma } from "../lib/prisma.js";

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const nextDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

export const findTodayDailyQuiz = async (
  userId: string,
  refDate = new Date()
) => {
  return prisma.dailyQuiz.findFirst({
    where: {
      userId,
      createdAt: { gte: startOfDay(refDate), lt: nextDay(refDate) },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const createDailyQuiz = async (
  userId: string,
  totalQuestions: number
) => {
  return prisma.dailyQuiz.create({
    data: { userId, totalQuestions, score: 0 },
  });
};

export const saveOrUpdateDailyQuiz = async (
  userId: string,
  refDate: Date,
  totalQuestions: number
) => {
  const existing = await findTodayDailyQuiz(userId, refDate);
  if (existing) {
    if (existing.totalQuestions !== totalQuestions) {
      return prisma.dailyQuiz.update({
        where: { id: existing.id },
        data: { totalQuestions },
      });
    }
    return existing;
  }
  return createDailyQuiz(userId, totalQuestions);
};

export const submitDailyQuiz = async (quizId: string, score: number) => {
  return prisma.dailyQuiz.update({
    where: { id: quizId },
    data: { score, submittedAt: new Date() },
  });
};

export const updateDailyQuizScoreByUserToday = async (
  userId: string,
  refDate: Date,
  score: number
) => {
  const quiz = await findTodayDailyQuiz(userId, refDate);
  if (!quiz) return null;
  return prisma.dailyQuiz.update({
    where: { id: quiz.id },
    data: { score, submittedAt: new Date() },
  });
};
