import { prisma } from "../lib/prisma.js";

export const buildUserQuizData = async (
  userId: string,
  totalQuestions: number
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userCompletions: {
        include: {
          topic: {
            include: {
              course: { include: { level: true } },
              questions: true,
            },
          },
        },
      },
    },
  });

  const userCompletions = user?.userCompletions;
  if (!userCompletions || userCompletions.length === 0) {
    return null;
  }

  const topicMap = new Map<
    string,
    { topic: string; available: { level: number; count: number }[] }
  >();
  const progressMap = new Map<
    string,
    {
      topic: string;
      progressByLevel: { level: number; solved: number; attempted: number }[];
    }
  >();

  for (const completion of userCompletions) {
    const topic = completion.topic;
    const course = topic.course;
    const levelNumber = parseInt(course.level.title.match(/\d+/)?.[0] || "0");

    // Build userTopics
    if (!topicMap.has(topic.title)) {
      topicMap.set(topic.title, {
        topic: topic.title,
        available: [{ level: levelNumber, count: topic.questions.length }],
      });
    } else {
      const available = topicMap.get(topic.title)!.available;
      const levelEntry = available.find((a) => a.level === levelNumber);
      if (levelEntry) {
        levelEntry.count += topic.questions.length;
      } else {
        available.push({ level: levelNumber, count: topic.questions.length });
      }
    }

    // Build userProgress
    if (!progressMap.has(topic.title)) {
      progressMap.set(topic.title, {
        topic: topic.title,
        progressByLevel: [
          {
            level: levelNumber,
            solved: topic.solved,
            attempted: topic.attempted,
          },
        ],
      });
    } else {
      const progressByLevel = progressMap.get(topic.title)!.progressByLevel;
      const progressEntry = progressByLevel.find(
        (p) => p.level === levelNumber
      );
      if (progressEntry) {
        progressEntry.solved += topic.solved;
        progressEntry.attempted += topic.attempted;
      } else {
        progressByLevel.push({
          level: levelNumber,
          solved: topic.solved,
          attempted: topic.attempted,
        });
      }
    }
  }

  return {
    userId,
    totalQuestions,
    userTopics: Array.from(topicMap.values()),
    userProgress: Array.from(progressMap.values()),
  };
};
