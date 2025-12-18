import axiosInstance from "../config/axiosInstance";
import { Course } from "../modules/courses/Course.interface";



export const courseService = {
  // 🟢 Get all courses
  getCoursesList: async (): Promise<Course[]> => {
    const { data } = await axiosInstance.get<{
      success: boolean;
      statusCode: number;
      timestamp: string;
      data: Course[];
    }>("/courses");

    return data.data; // ✅ unwrap the data
  },

  // 🟢 Get single course details
  getCourseDetails: async (courseId: string): Promise<Course> => {
    const { data } = await axiosInstance.get<{
      success: boolean;
      statusCode: number;
      timestamp: string;
      data: Course;
    }>(`/courses/${courseId}`);

    return data.data; // ✅ unwrap the data
  },
};
