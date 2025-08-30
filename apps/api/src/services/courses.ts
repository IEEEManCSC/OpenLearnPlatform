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
  levelId: string | undefined,
  trackId: string,
  userId: string,
) => {
  const courses = await prisma.course.findMany({
    where: {
      trackId,
      levelId,
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

  return courses.map((course) => {
    const totalTopics = course.topics.length;
    const completedTopics = course.topics.filter(
      (topic) => topic.userCompletions.length > 0,
    ).length;
    const completedPercentage = (completedTopics / totalTopics) * 100;

    return {
      ...course,
      completedPercentage,
    };
  });
};
