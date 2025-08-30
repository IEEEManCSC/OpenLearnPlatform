import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { getTopicParamsSchema } from "../schemas/topics.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  markTopicAsCompleted,
  getTopic,
  unmarkTopicAsCompleted,
} from "../services/topics.js";

const router = Router();

router.get(
  "/:topicId",
  requireAuth,
  validate({ params: getTopicParamsSchema }),
  async (req, res) => {
    const topic = await getTopic(req.params.topicId);

    res.enhancedSend(200, topic);
  },
);

router.post(
  "/:topicId/completion",
  requireAuth,
  validate({ params: getTopicParamsSchema }),
  async (req, res) => {
    const topic = await markTopicAsCompleted(req.user!.id, req.params.topicId);
    res.enhancedSend(201, topic);
  },
);

router.delete(
  "/:topicId/completion",
  requireAuth,
  validate({ params: getTopicParamsSchema }),
  async (req, res) => {
    await unmarkTopicAsCompleted(req.user!.id, req.params.topicId);
    res.enhancedSend(204, undefined);
  },
);

export { router as topicsRouter };
