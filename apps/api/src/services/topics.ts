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

export const completeTopic = async (userId: string, topicId: string) => {
  return await prisma.userCompletion.create({
    data: {
      userId,
      topicId,
    },
  });
};
export const inCompleteTopic = async (userId: string, topicId: string) => {
  prisma.userCompletion.delete({
    where: {
      userId_topicId: { userId, topicId },
    },
  });
};

export const getToltalTopics = async (courseId: string) => {
  return await prisma.topic.findMany({
    where: {
      courseId,
    },
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
