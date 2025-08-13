import z from "zod";

export const submitDailyQuizBodySchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        choiceIndex: z.number().int().min(0),
      })
    )
    .min(1),
});
