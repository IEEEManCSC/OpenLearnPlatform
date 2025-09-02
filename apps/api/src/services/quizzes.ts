import { getMonthInterval, getStartOfDay } from "../helpers/dates.js";
import { prisma } from "../lib/prisma.js";
import { AvailableTopic, TopicPerformance } from "../schemas/quizzes.js";

export interface SubmittedAnswerInput {
  questionId: string;
  choiceIndex: number;
}

export interface GradedAnswerResult {
  questionId: string;
  userChoiceIndex: number | null;
  correctOptionIndex: number;
  isCorrect: boolean;
}

export interface GradeQuizResult {
  graded: GradedAnswerResult[];
  correctCount: number;
  total: number;
  scorePercentage: number; // 0-100
}

const INVALID_QUESTION_INDEX = -1;

export const getMonthSubmissions = async (
  month: number,
  year: number,
  userId: string,
) => {
  const { start, end } = getMonthInterval(month, year);
  const submissions = await prisma.dailyQuiz.findMany({
    where: {
      userId,
      submittedAt: { not: null, gte: start, lt: end },
    },
    select: { submittedAt: true },
  });
  const days = Array.from({ length: 31 }).fill(false); // 31 days max
  for (const submission of submissions) {
    if (!submission.submittedAt) continue;
    const day = submission.submittedAt.getDate(); // 1-based
    if (day >= 1 && day <= 31) days[day - 1] = true;
  }
  return days;
};

export const getQuizByDate = async (userId: string, refDate = new Date()) => {
  return prisma.dailyQuiz.findFirst({
    where: {
      userId,
      quizDate: getStartOfDay(refDate),
    },
  });
};

export const buildUserQuizData = async (
  userId: string,
  totalQuestions: number,
) => {
  const topics = await prisma.topic.findMany({
    where: {
      userCompletions: { some: { userId } },
    },
    select: {
      id: true,
      userPerformances: { where: { userId } },
    },
  });

  if (!topics || topics.length === 0) {
    return null;
  }

  const userTopics: AvailableTopic[] = [];
  const userProgress: TopicPerformance[] = [];

  for (const topic of topics) {
    const questionsCount = await prisma.question.groupBy({
      where: { topics: { some: { id: topic.id } } },
      _count: { id: true },
      by: ["difficulty"],
    });

    userTopics.push({
      topic: topic.id,
      available: questionsCount.map((value) => ({
        difficulty: value.difficulty,
        count: value._count.id,
      })),
    });

    userProgress.push({
      topic: topic.id,
      progressByLevel: topic.userPerformances,
    });
  }

  return {
    userId,
    totalQuestions,
    userTopics,
    userProgress,
  };
};

export const createDailyQuiz = async (
  userId: string,
  totalQuestions: number,
) => {
  return prisma.dailyQuiz.create({
    data: {
      userId,
      totalQuestions,
      score: 0,
      quizDate: getStartOfDay(new Date()),
    },
  });
};

export const submitDailyQuiz = async (userId: string, score: number) => {
  const day = getStartOfDay(new Date());
  return prisma.dailyQuiz.updateMany({
    where: { userId, quizDate: day },
    data: { score, submittedAt: new Date() },
  });
};

/**
 * Grades a batch of answers. Missing or invalid questions are ignored but still counted toward total if they existed in input.
 */
export const gradeAnswers = async (
  answers: SubmittedAnswerInput[],
): Promise<GradeQuizResult> => {
  // Dedupe by questionId (keep last answer provided by user)
  const map = new Map<string, SubmittedAnswerInput>();
  for (const a of answers) {
    if (a && a.questionId) map.set(a.questionId, a);
  }
  const uniqueAnswers = [...map.values()];
  if (uniqueAnswers.length === 0) {
    return { graded: [], correctCount: 0, total: 0, scorePercentage: 0 };
  }

  const questionIds = uniqueAnswers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    select: { id: true, correctOptionIndex: true },
  });
  const questionMap = new Map<
    string,
    { id: string; correctOptionIndex: number }
  >(
    questions.map((q: { id: string; correctOptionIndex: number }) => [q.id, q]),
  );

  const graded: GradedAnswerResult[] = uniqueAnswers.map((a) => {
    const q = questionMap.get(a.questionId);
    if (!q) {
      return {
        questionId: a.questionId,
        userChoiceIndex: a.choiceIndex ?? null,
        correctOptionIndex: INVALID_QUESTION_INDEX,
        isCorrect: false,
      };
    }
    const isCorrect = a.choiceIndex === q.correctOptionIndex;
    return {
      questionId: q.id,
      userChoiceIndex: a.choiceIndex ?? null,
      correctOptionIndex: q.correctOptionIndex,
      isCorrect,
    };
  });

  const correctCount = graded.filter((g) => g.isCorrect).length;
  const total = graded.length;
  const scorePercentage =
    total === 0 ? 0 : +((correctCount / total) * 100).toFixed(2);

  return { graded, correctCount, total, scorePercentage };
};
