import z from "zod";

export const getCourseParamsSchema = z.object({
  courseId: z.string().min(1, "courseId is required"),
});

export const getCourseQuerySchema = z.object({
  completed: z.enum(["true", "false"]).optional(),
});
