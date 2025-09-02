import { Router } from "express";
import { notesRouter } from "./routes/notes.js";
import { tracksRouter } from "./routes/tracks.js";
import { coursesRouter } from "./routes/courses.js";
import { topicsRouter } from "./routes/topics.js";

export const ROUTES_PREFIX = "/api";

export const router = Router();

router.use("/notes", notesRouter);
router.use("/tracks", tracksRouter);
router.use("/courses", coursesRouter);
router.use("/topics", topicsRouter);
