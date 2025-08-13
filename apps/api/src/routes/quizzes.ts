import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { submitDailyQuizBodySchema } from "../schemas/quizzes.js";

const router = Router();

router.get("/monthly-stats", (req, res) => {
  res.send(req.url);
});

router.get("/daily", (req, res) => {
  res.send(req.url);
});

router.post(
  "/daily",
  validate({ body: submitDailyQuizBodySchema }),
  (req, res) => {
    res.send(req.url);
  },
);

export { router as quizzesRouter };
