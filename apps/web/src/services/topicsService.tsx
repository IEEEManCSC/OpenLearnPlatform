import axiosInstance from "../config/axiosInstance";

interface Topic {
  id: string;
  name: string;
  content: string;
  courseId: string;
  order: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
}

export const topicsService = {
  // 🟢 Get by ID
  getTopicById: async (topicId: string): Promise<Topic> => {
    const { data } = await axiosInstance.get<ApiResponse<Topic>>(
      `/topics/${topicId}`,
    );
    return data.data;
  },

  // 🟢 Mark completed
  markTopicAsCompleted: async (
    topicId: string,
  ): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.post<
      ApiResponse<{ success: boolean }>
    >(`/topics/${topicId}/completion`);
    return data.data;
  },

  // 🟢 Unmark completed
  unMarkTopicAsCompleted: async (
    topicId: string,
  ): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.post<
      ApiResponse<{ success: boolean }>
    >(`/topics/${topicId}/uncompletion`);
    return data.data;
  },
};
