import axiosInstance from "../config/axiosInstance";
import { Topic } from "../modules/topics/topics.interface";
import { ApiResponse } from "../modules/apiResponse/apiResponse.interface";

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
