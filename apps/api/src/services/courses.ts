import { prisma } from "../lib/prisma.js";

export const getCourse = async (courseId: string) => {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
};

export const getToltalTopics = async (courseId: string) => {
  return await prisma.topic.findMany({
    where: {
      courseId,
    },
    select: {
      title: true,
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
  });
};

export const getCourses = async (
  levelId: string,
  trackId: string,
  userId: string,
) => {
  return await prisma.course.findMany({
    where: {
      trackId,
      ...(levelId && { levelId }),
    },
    orderBy: {
      order: "asc",
    },
    include: {
      topics: {
        select: {
          userCompletions: {
            where: {
              userId,
            },
          },
        },
      },
    },
  });
};
