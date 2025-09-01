import axiosInstance from "../config/axiosInstance";

export interface Topic {
  id: string;
  name: string;
  content: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  level: string;
  topics: Topic[];
  completedPercentage: number;
}

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
