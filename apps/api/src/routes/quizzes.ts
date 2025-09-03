import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  getMonthSubmissionsQuerySchema,
  submitDailyQuizBodySchema,
} from "../schemas/quizzes.js";
import {
  buildUserQuizData,
  createDailyQuiz,
  getMonthSubmissions,
  getQuizByDate,
  gradeAnswers,
  submitDailyQuiz,
} from "../services/quizzes.js";
import NotEnoughTopics from "../errors/not-enough-topics.js";
import { fetchAiRecommendation } from "../services/recommendations.js";
import { fetchQuestionsByRecommendation } from "../services/questions.js";
import AlreadySubmittedQuiz from "../errors/already-submitted-quiz.js";

const router = Router();

// Calendar of submissions (month view)
router.get(
  "/calendar",
  requireAuth,
  validate({ query: getMonthSubmissionsQuerySchema }),
  async (req, res) => {
    const userId = req.session!.userId;

    const now = new Date();
    const year = req.query.year || now.getFullYear();
    const month = req.query.month ? req.query.month - 1 : now.getMonth();

    const days = await getMonthSubmissions(month, year, userId);

    res.enhancedSend(200, { year, month: month + 1, days });
  },
);

// Fetch / (re)generate today's quiz for the user
router.get("/daily", requireAuth, async (req, res): Promise<void> => {
  const userId = req.session!.userId;
  const today = new Date();

  const existingQuiz = await getQuizByDate(userId, today);
  const totalQuestions = existingQuiz?.totalQuestions || 10;

  if (existingQuiz?.submittedAt) {
    throw new AlreadySubmittedQuiz();
  }

  // Build data for AI
  const quizData = await buildUserQuizData(userId, totalQuestions);
  if (!quizData) {
    throw new NotEnoughTopics();
  }

  const aiRecommendation = await fetchAiRecommendation(quizData);
  const questions = await fetchQuestionsByRecommendation(
    aiRecommendation,
    totalQuestions,
  );

  const quiz = existingQuiz ?? (await createDailyQuiz(userId, totalQuestions));

  res.enhancedSend(200, { quiz, questions, aiRecommendation });
});

// Submit answers for today's quiz
router.post(
  "/daily",
  requireAuth,
  validate({ body: submitDailyQuizBodySchema }),
  async (req, res) => {
    const { answers } = req.body;

    const grading = await gradeAnswers(answers);
    await submitDailyQuiz(req.user!.id, grading.scorePercentage);

    res.enhancedSend(200, {
      score: grading.scorePercentage,
      correctCount: grading.correctCount,
      total: grading.total,
      answers: grading.graded,
    });
  },
);

export { router as quizzesRouter };
