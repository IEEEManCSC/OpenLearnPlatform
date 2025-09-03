// src/hooks/courseHooks.ts
import { useQuery } from "@tanstack/react-query";
import { courseService, Course } from "../services/coursesService";

// ================== useCoursesList ==================
export const useCoursesList = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: courseService.getCoursesList,
  });
};

// ================== useCourseDetails ==================
export const useCourseDetails = (courseId: string) => {
  return useQuery<Course>({
    queryKey: ["courseDetails", courseId],
    queryFn: () => courseService.getCourseDetails(courseId),
    enabled: !!courseId,
  });
};
