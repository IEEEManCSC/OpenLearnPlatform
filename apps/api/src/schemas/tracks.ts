import z from "zod";

export const getTrackParamsSchema = z.object({
  trackId: z.string().min(1, "trackId is required"),
});
export const getTrackQuerySchema = z.object({
  levelId: z.string().optional(),
});
