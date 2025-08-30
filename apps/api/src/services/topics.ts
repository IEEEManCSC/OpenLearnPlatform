import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

export const getTopic = async (topicId: string) => {
  return prisma.topic.findUnique({
    where: {
      id: topicId,
    },
    select: {
      title: true,
      durationInMinutes: true,
      content: true,
    },
  });
};

export const markTopicAsCompleted = async (userId: string, topicId: string) => {
  return await prisma.userCompletion.create({
    data: {
      userId,
      topicId,
    },
  });
};
export const unmarkTopicAsCompleted = async (
  userId: string,
  topicId: string,
) => {
  return await prisma.userCompletion.delete({
    where: {
      userId_topicId: { userId, topicId },
    },
  });
};

export const getToltalTopics = async (
  courseId: string,
  completion?: { isCompleted: boolean; userId: string },
) => {
  const whereClause: Prisma.TopicWhereInput = { courseId };
  if (completion?.isCompleted === true) {
    whereClause.userCompletions = {
      some: { userId: completion.userId },
    };
  } else if (completion?.isCompleted === false) {
    whereClause.userCompletions = {
      none: { userId: completion?.userId },
    };
  }
  return await prisma.topic.findMany({
    where: whereClause,
    orderBy: {
      order: "asc",
    },
  });
};

export const getCompletedTopics = async (userId: string, courseId: string) => {
  return await prisma.userCompletion.findMany({
    where: {
      userId,
      topic: {
        courseId,
      },
    },
    include: {
      topic: true,
    },
  });
};
