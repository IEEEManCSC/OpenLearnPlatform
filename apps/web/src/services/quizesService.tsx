import axiosInstance from "../config/axiosInstance";

// ✅ Shared API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
}

// ================== Calendar ==================
export interface QuizCalendarDay {
  day: number;
  hasSubmission: boolean;
  score: number | null;
}

export interface QuizCalendar {
  year: number;
  month: number;
  days: QuizCalendarDay[];
}

// ================== Daily Quiz ==================
export interface QuizInfo {
  id: string;
  userId: string;
  date: string;
  totalQuestions: number;
  submittedAt: string | null;
  score: number | null;
}

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  difficulty: string;
  topic: string;
}

export interface QuizRecommendationTopic {
  topic: string;
  difficulty: string;
  count: number;
}

export interface QuizAIRecommendation {
  recommendedTopics: QuizRecommendationTopic[];
  reasoning: string;
}

export interface DailyQuizResponse {
  quiz: QuizInfo;
  questions: QuizQuestion[];
  aiRecommendation: QuizAIRecommendation;
}

// ================== Submit ==================
export interface QuizAnswerSubmission {
  questionId: string;
  choiceIndex: number;
}

export interface QuizSubmitRequest {
  answers: QuizAnswerSubmission[];
}

export interface QuizAnswerResult {
  questionId: string;
  choiceIndex: number;
  isCorrect: boolean;
  correctChoiceIndex: number;
  explanation: string;
}

export interface QuizSubmitResponse {
  score: number;
  correctCount: number;
  total: number;
  answers: QuizAnswerResult[];
}

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
