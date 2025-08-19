import z from "zod";

export const getTopicParamsSchema = z.object({
  topicId: z.string().min(1, "topicId is required"),
});
