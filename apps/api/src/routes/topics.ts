import exprees from "express";
const router = exprees.Router();
import { validate } from "../middlewares/validate.js";
import { getTopicParamsSchema } from "../schemas/topics.js";
import * as Service from "../services/topics.js";
import { requireAuth } from "../middlewares/auth.js";

router.get(
  "/:topicId",
  validate({ params: getTopicParamsSchema }),
  async (req, res) => {
    const topic = await Service.getTopic(req.params.topicId);

    res.status(200).json({
      topic,
    });
  },
);
router.post(
  "/:topicId/completion",
  requireAuth,
  validate({ params: getTopicParamsSchema }),
  async (req, res) => {
    const topic = await Service.completeTopic(req.user!.id, req.params.topicId);
    res.status(201).json({
      topic,
    });
  },
);
router.delete(
  "/:topicId/completion",
  requireAuth,
  validate({ params: getTopicParamsSchema }),
  async (req, res) => {
    await Service.inCompleteTopic(req.user!.id, req.params.topicId);
    res.status(204).json({});
  },
);

export { router as topicsRouter };
