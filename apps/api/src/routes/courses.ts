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
    const persentage = (completedTopics.length / totalTopics.length) * 100;

    res.status(200).json({
      course,
      totalTopics,
      persentage,
    });
  },
);
router.get(
  "/:courseId/topics",
  requireAuth,
  validate({ params: getCourseParamsSchema, query: getCourseQuerySchema }),
  async (req, res) => {
    const { completed } = req.query;

    const totalTopics = await topicService.getToltalTopics(req.params.courseId);

    const completedTopics = await topicService.getCompletedTopics(
      req.user!.id,
      req.params.courseId,
    );

    let filterdTopics;
    if (completed === "true") {
      filterdTopics = completedTopics;
    } else if (completed === "false") {
      const completedTopicsIds = completedTopics.map((ele) => ele.topic.id);
      const unCompletedTopics = totalTopics.filter(
        (ele) => !completedTopicsIds.includes(ele.id),
      );
      filterdTopics = unCompletedTopics;
    } else {
      filterdTopics = totalTopics;
    }

    res.status(200).json({
      filterdTopics,
    });
  },
);

export { router as coursesRouter };
