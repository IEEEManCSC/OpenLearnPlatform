// src/hooks/courseHooks.ts
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/coursesService";
import { Course } from "../modules/courses/Course.interface";
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
