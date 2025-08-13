import z from "zod";

export const submitDailyQuizBodySchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      answer: z.string().optional(),
    }),
  ),
});
