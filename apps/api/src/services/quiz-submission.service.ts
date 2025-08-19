import { prisma } from "../lib/prisma.js";

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

/**
 * Grades a batch of answers. Missing or invalid questions are ignored but still counted toward total if they existed in input.
 */
export const gradeAnswers = async (
  answers: SubmittedAnswerInput[]
): Promise<GradeQuizResult> => {
  // Dedupe by questionId (keep last answer provided by user)
  const map = new Map<string, SubmittedAnswerInput>();
  for (const a of answers) {
    if (a && a.questionId) map.set(a.questionId, a);
  }
  const uniqueAnswers = Array.from(map.values());
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
    questions.map((q: { id: string; correctOptionIndex: number }) => [q.id, q])
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
