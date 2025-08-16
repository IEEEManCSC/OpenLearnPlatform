import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  createNote,
  deleteNote,
  getAllFilteredNotes,
  getNoteById,
  updateNote,
} from "../services/notes.js";
import {
  CreateNoteBodySchema,
  GetAllNotesQuerySchema,
  noteIdSchema,
  topicIdSchema,
  UpdateNoteBodySchema,
} from "../schemas/notes.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.use(requireAuth);

router.get(
  "/api/notes/:noteId",
  validate({ params: noteIdSchema }),
  async (req, res) => {
    const { noteId } = req.params;
    const response = await getNoteById(noteId, req.user!.id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  },
);

router.get(
  "/api/notes",
  validate({ query: GetAllNotesQuerySchema }),
  async (req, res) => {
    const response = await getAllFilteredNotes(req.user!.id, req.query);
    res.status(200).json({
      status: "success",
      pagination: response.pagination,
      data: response.data,
    });
  },
);

router.post(
  "/api/topics/:topicId/notes",
  validate({ params: topicIdSchema, body: CreateNoteBodySchema }),
  async (req, res) => {
    const { topicId } = req.params;
    const { title, content } = req.body;
    const response = await createNote(
      { title, content },
      topicId,
      req.user!.id,
    );
    res.status(201).json({
      status: "success",
      data: response,
    });
  },
);

router.put(
  "/api/notes/:noteId",
  validate({ params: noteIdSchema, body: UpdateNoteBodySchema }),
  async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const response = await updateNote(noteId, req.user!.id, { title, content });
    res.status(200).json({
      status: "success",
      data: response,
    });
  },
);

router.delete(
  "/api/notes/:noteId",
  validate({ params: noteIdSchema }),
  async (req, res) => {
    const { noteId } = req.params;
    await deleteNote(noteId, req.user!.id);
    res.status(204).json({
      status: "success",
      message: "Note deleted successfully.",
    });
  },
);

export { router as notesRouter };
