import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quizService } from "../services/quizesService";
import {
  QuizCalendar,
  DailyQuizResponse,
  QuizSubmitRequest,
  QuizSubmitResponse,
} from "../modules/quizes/quizes.interface";

// ================== useQuizCalendar ==================
export const useQuizCalendar = (courseId: string) => {
  return useQuery<QuizCalendar>({
    queryKey: ["quizCalendar", courseId],
    queryFn: () => quizService.getQuizCalendar(courseId),
    enabled: !!courseId,
  });
};

// ================== useDailyQuiz ==================
export const useDailyQuiz = (courseId: string) => {
  return useQuery<DailyQuizResponse>({
    queryKey: ["dailyQuiz", courseId],
    queryFn: () => quizService.getDailyQuiz(courseId),
    enabled: !!courseId,
  });
};

// ================== useSubmitDailyQuiz ==================
export const useSubmitDailyQuiz = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation<QuizSubmitResponse, Error, QuizSubmitRequest>({
    mutationFn: (answers: QuizSubmitRequest) =>
      quizService.submitDailyQuiz(courseId, answers),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizCalendar", courseId] });
      queryClient.invalidateQueries({ queryKey: ["dailyQuiz", courseId] });
    },
  });
};
