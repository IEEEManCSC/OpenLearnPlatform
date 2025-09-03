import { prisma } from "../lib/prisma.js";

export const fetchQuestionsByRecommendation = async (
  aiRecommendation: { topics: { recommendations: { level: number }[] }[] },
  totalQuestions: number,
) => {
  const levelsToFetch = aiRecommendation.topics.flatMap((topic) =>
    topic.recommendations.map((rec) => rec.level),
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
