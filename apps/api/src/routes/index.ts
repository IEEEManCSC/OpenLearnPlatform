import express from "express";
const router = express.Router();
import { tracksRouter } from "./tracks.js";
import { coursesRouter } from "./courses.js";
import { topicsRouter } from "./topics.js";

router.get("/", (req, res) => {
  res.status(200).json({
    message: "hello from api.",
  });
});

router.use("/tracks", tracksRouter);
router.use("/courses", coursesRouter);
router.use("/topics", topicsRouter);

export default router;
