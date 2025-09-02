import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  getTrackQuerySchema,
  getTrackParamsSchema,
} from "../schemas/tracks.js";
import { requireAuth } from "../middlewares/auth.js";
import { getAllTracks, getTrack } from "../services/tracks.js";
import { getCourses } from "../services/courses.js";

const router = Router();

router.get("/", async (req, res) => {
  const tracks = await getAllTracks();
  res.enhancedSend(200, tracks);
});

router.get(
  "/:trackId",
  requireAuth,
  validate({ params: getTrackParamsSchema, query: getTrackQuerySchema }),
  async (req, res) => {
    const { levelId } = req.query;
    const track = await getTrack(req.params.trackId);

    const courses = await getCourses(levelId, req.params.trackId, req.user!.id);

    res.enhancedSend(200, { ...track, courses });
  },
);

export { router as tracksRouter };
