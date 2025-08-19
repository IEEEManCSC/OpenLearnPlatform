import { Request, Response } from "express";
import type { Session, User } from "better-auth";
import { prisma } from "../lib/prisma.js";

declare global {
  // Ensure session typing just like other controllers
  namespace Express {
    interface Request {
      session?: Session;
      user?: User;
    }
  }
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}
const send = <T>(res: Response, code: number, body: ApiResponse<T>) =>
  res.status(code).json(body);

// Utility to get month boundaries in local time (00:00:00.000 inclusive to next month start exclusive)
const monthRange = (year: number, month0: number) => {
  const start = new Date(year, month0, 1, 0, 0, 0, 0);
  const end = new Date(year, month0 + 1, 1, 0, 0, 0, 0);
  return { start, end };
};

/**
 * Returns an array of booleans (index 0 = day 1) for the requested month indicating
 * which days the user submitted a quiz (DailyQuiz.submittedAt not null).
 * Query params: year=YYYY, month=1-12 (defaults to current year/month if omitted)
 */
export const getQuizSubmissionCalendar = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.session) {
    send(res, 401, { status: "fail", message: "Unauthorized" });
    return;
  }
  const userId = req.session.userId;

  // Parse month/year with fallbacks
  const now = new Date();
  const year = Number(req.query.year) || now.getFullYear();
  const monthParam = Number(req.query.month); // 1-12
  const month0 =
    monthParam && monthParam >= 1 && monthParam <= 12 ?
      monthParam - 1
    : now.getMonth();

  try {
    const { start, end } = monthRange(year, month0);
    const daysInMonth = new Date(year, month0 + 1, 0).getDate();
    const days: boolean[] = Array(daysInMonth).fill(false);

    const submissions = await prisma.dailyQuiz.findMany({
      where: {
        userId,
        submittedAt: { not: null, gte: start, lt: end },
      },
      select: { submittedAt: true },
    });

    for (const s of submissions) {
      if (!s.submittedAt) continue;
      const day = s.submittedAt.getDate(); // 1-based
      if (day >= 1 && day <= daysInMonth) days[day - 1] = true;
    }

    send(res, 200, {
      status: "success",
      data: { year, month: month0 + 1, days },
    });
  } catch (err) {
    console.error("[getQuizSubmissionCalendar] error", err);
    send(res, 500, {
      status: "error",
      message: "Failed to fetch calendar",
    });
  }
};
