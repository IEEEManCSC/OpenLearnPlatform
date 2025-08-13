import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { submitDailyQuizBodySchema } from "../schemas/quizzes.js";
import { getQuiz, submitQuiz } from "../controller/quiz.controller.js";
import { getQuizSubmissionCalendar } from "../controller/calender.controller.js";

const router = Router();

// Calendar of submissions (month view)
router.get(
  "/calendar",
  requireAuth,
  // optional validation for query could be added later
  getQuizSubmissionCalendar
);

// Fetch / (re)generate today's quiz for the user
router.get("/daily", requireAuth, getQuiz);

// Submit answers for today's quiz
router.post(
  "/daily",
  requireAuth,
  validate({ body: submitDailyQuizBodySchema }),
  submitQuiz
);

export { router as quizzesRouter };
