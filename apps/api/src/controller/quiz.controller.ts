import { Request, Response } from "express";
import type { Session, User } from "better-auth";
import { fetchAiRecommendation } from "../services/ai.service.js";
import { buildUserQuizData } from "../services/quiz-data.service.js";
import { fetchQuestionsByRecommendation } from "../services/question.service.js";
import {
  saveOrUpdateDailyQuiz,
  findTodayDailyQuiz,
} from "../services/daily-quiz.service.js";
import {
  gradeAnswers,
  SubmittedAnswerInput,
} from "../services/quiz-submission.service.js";
import { updateDailyQuizScoreByUserToday } from "../services/daily-quiz.service.js";

declare global {
  namespace Express {
    interface Request {
      session?: Session;
      user?: User;
    }
  }
}

// Utility helpers -------------------------------------------------------------
const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}
const send = <T>(res: Response, code: number, body: ApiResponse<T>) =>
  res.status(code).json(body);

export const getQuiz = async (req: Request, res: Response): Promise<void> => {
  if (!req.session) {
    send(res, 401, { status: "fail", message: "Unauthorized" });
    return;
  }
  const userId = req.session.userId;
  const today = new Date();

  try {
    // Fetch existing quiz (by date range) if any
    const existingQuiz = await findTodayDailyQuiz(userId, today);
    const totalQuestions = existingQuiz?.totalQuestions || 10;

    // Build data for AI
    const quizData = await buildUserQuizData(userId, totalQuestions);
    if (!quizData) {
      send(res, 404, {
        status: "fail",
        message: "User hasn't completed any topics yet",
      });
      return;
    }

    const aiRecommendation = await fetchAiRecommendation(quizData);
    const questions = await fetchQuestionsByRecommendation(
      aiRecommendation,
      totalQuestions
    );

    // Persist / update quiz record (schema only stores counts currently)
    const savedQuiz = await saveOrUpdateDailyQuiz(
      userId,
      startOfDay(today),
      totalQuestions
    );

    send(res, 200, {
      status: "success",
      data: { quiz: savedQuiz, questions, aiRecommendation },
    });
  } catch (err) {
    console.error("[getQuiz] error", err);
    send(res, 500, {
      status: "error",
      message: "Failed to generate quiz",
    });
  }
};

export const submitQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.session) {
    send(res, 401, { status: "fail", message: "Unauthorized" });
    return;
  }
  const userId = req.session.userId;
  const today = new Date();

  try {
    const { answers } = req.body as { answers: SubmittedAnswerInput[] };
    if (!Array.isArray(answers) || answers.length === 0) {
      send(res, 400, {
        status: "fail",
        message: "answers array required",
      });
      return;
    }

    const grading = await gradeAnswers(answers);
    await updateDailyQuizScoreByUserToday(
      userId,
      today,
      grading.scorePercentage
    );

    send(res, 200, {
      status: "success",
      data: {
        score: grading.scorePercentage,
        correctCount: grading.correctCount,
        total: grading.total,
        answers: grading.graded,
      },
    });
  } catch (err) {
    console.error("[submitQuiz] error", err);
    send(res, 500, {
      status: "error",
      message: "Failed to submit quiz",
    });
  }
};
