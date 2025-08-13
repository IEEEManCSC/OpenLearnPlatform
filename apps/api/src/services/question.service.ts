import { prisma } from "../lib/prisma.js";

export const fetchQuestionsByRecommendation = async (
  aiRecommendation: any,
  totalQuestions: number
) => {
  const levelsToFetch = aiRecommendation.topics.flatMap((topic: any) =>
    topic.recommendations.map((rec: any) => rec.level)
  );

  return prisma.question.findMany({
    where: {
      topics: {
        some: {
          course: {
            level: {
              title: { in: levelsToFetch.map((lvl: number) => `Level ${lvl}`) },
            },
          },
        },
      },
    },
    take: totalQuestions,
  });
};
