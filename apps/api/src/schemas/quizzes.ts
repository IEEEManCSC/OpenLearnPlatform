import z from "zod";

export type AvailableTopic = {
  topic: string;
  available: { difficulty: string; count: number }[];
};

export type TopicPerformance = {
  topic: string;
  progressByLevel: { difficulty: string; solved: number; attempted: number }[];
};

export type UserQuizData = {
  userTopics: AvailableTopic[];
  userProgress: TopicPerformance[];
};

export const getMonthSubmissionsQuerySchema = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
  year: z.coerce.number().min(2000).max(2100).optional(),
});

export const submitDailyQuizBodySchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        choiceIndex: z.number().int().min(0),
      }),
    )
    .min(1),
});
