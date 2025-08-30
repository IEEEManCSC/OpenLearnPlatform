import exprees from "express";
const router = exprees.Router();
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  getCourseParamsSchema,
  getCourseQuerySchema,
} from "../schemas/courses.js";
import * as Service from "../services/courses.js";
import * as topicService from "../services/topics.js";

router.get(
  "/:courseId",
  requireAuth,
  validate({ params: getCourseParamsSchema }),
  async (req, res) => {
    const course = await Service.getCourse(req.params.courseId);

    const totalTopics = await Service.getToltalTopics(req.params.courseId);

    const completedTopics = await Service.getCompletedTopics(
      req.user!.id,
      req.params.courseId,
    );
    const completedPercentage =
      (completedTopics.length / totalTopics.length) * 100;

    res.enhancedSend(200, {
      ...course,
      topics: totalTopics,
      completedPercentage,
    });
  },
);

router.get(
  "/:courseId/topics",
  requireAuth,
  validate({ params: getCourseParamsSchema, query: getCourseQuerySchema }),
  async (req, res) => {
    const { completed } = req.query;

    const topics = await topicService.getToltalTopics(
      req.params.courseId,
      completed
        ? { isCompleted: completed === "true", userId: req.user!.id }
        : undefined,
    );

    res.enhancedSend(200, topics);
  },
);

export { router as coursesRouter };
