import axiosInstance from "../config/axiosInstance";
import { QuizCalendar , DailyQuizResponse , QuizSubmitResponse , QuizSubmitRequest } from "../modules/quizes/quizes.interface";
import { ApiResponse } from "../modules/apiResponse/apiResponse.interface";

// ================== Service ==================
export const quizService = {
  // 🟢 Get Quiz Calendar
  getQuizCalendar: async (courseId: string): Promise<QuizCalendar> => {
    const { data } = await axiosInstance.get<ApiResponse<QuizCalendar>>(
      `/courses/${courseId}/quizzes/calendar`,
    );
    return data.data;
  },

  // 🟢 Get Daily Quiz
  getDailyQuiz: async (courseId: string): Promise<DailyQuizResponse> => {
    const { data } = await axiosInstance.get<ApiResponse<DailyQuizResponse>>(
      `/courses/${courseId}/quizzes/daily`,
    );
    return data.data;
  },

  // 🟢 Submit Daily Quiz
  submitDailyQuiz: async (
    courseId: string,
    answers: QuizSubmitRequest,
  ): Promise<QuizSubmitResponse> => {
    const { data } = await axiosInstance.post<ApiResponse<QuizSubmitResponse>>(
      `/courses/${courseId}/quizzes/daily/submit`,
      answers,
    );
    return data.data;
  },
};
