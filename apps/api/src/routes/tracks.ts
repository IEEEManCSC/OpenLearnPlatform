import exprees from "express";
const router = exprees.Router();
import { Prisma } from "../generated/prisma/client.js";
import { validate } from "../middlewares/validate.js";
import {
  getTrackQuerySchema,
  getTrackParamsSchema,
} from "../schemas/tracks.js";
import * as Service from "../services/tracks.js";
import { requireAuth } from "../middlewares/auth.js";
import * as courseSrvice from "../services/courses.js";

router.get("/", async (req, res) => {
  const tracks = await Service.getAllTracks();

  res.status(200).json({
    length: tracks.length,
    data: tracks,
  });
});
router.get(
  "/:trackId",
  requireAuth,
  validate({ params: getTrackParamsSchema, query: getTrackQuerySchema }),
  async (req, res) => {
    const { levelId } = req.query as { levelId: string };
    const track = await Service.getTrack(req.params.trackId);

    const courses = await courseSrvice.getCourses(
      levelId,
      req.params.trackId,
      req.user!.id,
    );
    const progress = courses.map(
      (
        course: Prisma.CourseGetPayload<{
          include: { topics: { select: { userCompletions: true } } };
        }>,
      ) => {
        const totalTopics = course.topics.length;
        const completedTopics = course.topics.filter(
          (topic) => topic.userCompletions.length > 0,
        ).length;
        const percentage = (completedTopics / totalTopics) * 100;

        return {
          id: course.id,
          title: course.title,
          percentage,
        };
      },
    );
    res.status(200).json({
      track,
      courses: progress,
    });
  },
);

export { router as tracksRouter };
