import z from "zod";

export const CreateNoteBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required and must be at least 1 character." }),
  content: z.string().trim().min(1, {
    message: "Content is required and must be at least 1 character.",
  }),
});

export const NoteSchema = z.object({
  id: z.string().cuid({ message: "id must be a valid CUID." }),
  title: z.string().min(1, { message: "Title must be at least 1 character." }),
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 character." }),
  topicId: z.string().cuid({ message: "topicId must be a valid CUID." }),
  userId: z.string().cuid({ message: "userId must be a valid CUID." }),
  courseId: z.string().cuid({ message: "courseId must be a valid CUID." }),
  createdAt: z.date({ message: "createdAt must be a valid date." }),
  updatedAt: z.date({ message: "updatedAt must be a valid date." }),
});

export const UpdateNoteBodySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title must be at least 1 character." })
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content must be at least 1 character." })
    .optional(),
});

// valitate query string
const validSortFields = new Set([
  "title",
  "-title",
  "createdAt",
  "-createdAt",
  "updatedAt",
  "-updatedAt",
]);

export const GetAllNotesQuerySchema = z.object({
  courseId: z
    .string()
    .cuid({ message: "courseId must be a valid CUID." })
    .optional(),
  topicId: z
    .string()
    .cuid({ message: "topicId must be a valid CUID." })
    .optional(),
  search: z.string().optional(),
  sort: z
    .string()
    .refine(
      (value) => {
        // Ensure every comma-separated value is in whitelist
        return value.split(",").every((field) => validSortFields.has(field));
      },
      { message: `Invalid sort field.` },
    )
    .optional(),
  page: z.coerce
    .number({ message: "page must be an number." })
    .int({ message: "page must be an integer." })
    .min(1, { message: "page must be at least 1." })
    .default(1),
  limit: z.coerce
    .number({ message: "limit must be an number." })
    .int({ message: "limit must be an integer." })
    .min(1, { message: "limit must be at least 1." })
    .default(10),
});

// valitate params
export const topicIdSchema = z.object({
  topicId: z.string().trim().cuid({ message: "id must be a valid CUID." }),
});
export const noteIdSchema = z.object({
  noteId: z.string().trim().cuid({ message: "id must be a valid CUID." }),
});

export type NoteServiceType = z.infer<typeof NoteSchema>;
export type UpdateNoteServiceType = z.infer<typeof UpdateNoteBodySchema>;
export type CreateNoteBodyType = z.infer<typeof CreateNoteBodySchema>;
export type GetAllNotesQueryType = z.infer<typeof GetAllNotesQuerySchema>;
