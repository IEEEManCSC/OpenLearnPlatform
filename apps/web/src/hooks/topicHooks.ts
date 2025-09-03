// src/hooks/useTopics.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { topicsService } from "../services/topicsService";

// 🟢 Get Topic by ID
export const useTopicById = (topicId: string) => {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => topicsService.getTopicById(topicId),
    enabled: !!topicId,
  });
};

// 🟢 Mark Topic as Completed
export const useMarkTopicAsCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topicId: string) =>
      topicsService.markTopicAsCompleted(topicId),
    onSuccess: (_, topicId) => {
      queryClient.invalidateQueries({ queryKey: ["topic", topicId] });
    },
  });
};

// 🟢 Unmark Topic as Completed
export const useUnmarkTopicAsCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topicId: string) =>
      topicsService.unMarkTopicAsCompleted(topicId),
    onSuccess: (_, topicId) => {
      queryClient.invalidateQueries({ queryKey: ["topic", topicId] });
    },
  });
};
