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
  UpdateNoteBodySchema,
} from "../schemas/notes.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/:noteId", validate({ params: noteIdSchema }), async (req, res) => {
  const { noteId } = req.params;
  const response = await getNoteById(noteId, req.user!.id);
  res.enhancedSend(200, response);
});

router.get(
  "/",
  validate({ query: GetAllNotesQuerySchema }),
  async (req, res) => {
    const response = await getAllFilteredNotes(req.user!.id, req.query);
    res.enhancedSend(200, response.data, response.pagination);
  },
);

router.post("/", validate({ body: CreateNoteBodySchema }), async (req, res) => {
  const { title, content, topicId } = req.body;
  const response = await createNote({ title, content, topicId }, req.user!.id);
  res.enhancedSend(201, response);
});

router.put(
  "/:noteId",
  validate({ params: noteIdSchema, body: UpdateNoteBodySchema }),
  async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const response = await updateNote(noteId, req.user!.id, { title, content });
    res.enhancedSend(200, response);
  },
);

router.delete(
  "/:noteId",
  validate({ params: noteIdSchema }),
  async (req, res) => {
    const { noteId } = req.params;
    await deleteNote(noteId, req.user!.id);
    res.enhancedSend(204, undefined);
  },
);

export { router as notesRouter };
