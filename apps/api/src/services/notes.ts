import { NotFoundError } from "../errors/not-found.js";
import PermissionDenied from "../errors/permission-denied.js";
import { Note, Prisma } from "../generated/prisma/client.js";
import { Not } from "../generated/prisma/internal/prismaNamespace.js";
import { prisma } from "../lib/prisma.js";
import {
  CreateNoteBodyType,
  GetAllNotesQueryType,
  NoteServiceType,
  UpdateNoteServiceType,
} from "../schemas/notes.js";

interface PaginatedNotesResult {
  pagination: {
    totalNotes: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  data: NoteServiceType[];
}

export async function createNote(
  input: CreateNoteBodyType,
  topicId: string,
  userId: string,
): Promise<NoteServiceType> {
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    select: { courseId: true },
  });

  if (!topic) {
    throw new NotFoundError();
  }

  const createdNote = await prisma.note.create({
    data: {
      title: input.title,
      content: input.content,
      topicId,
      userId,
      courseId: topic.courseId,
    },
  });

  return createdNote;
}

export async function getNoteById(
  noteId: string,
  userId: string,
): Promise<NoteServiceType> {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId: userId, // Authorization check
    },
  });

  if (!note) {
    throw new NotFoundError();
  }

  return note;
}

export async function updateNote(
  noteId: string,
  userId: string,
  data: UpdateNoteServiceType,
): Promise<NoteServiceType> {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId: userId,
    },
  });

  if (!note) {
    throw new NotFoundError();
  }

  const updatedNote = await prisma.note.update({
    where: { id: noteId },
    data,
  });

  return updatedNote;
}

export async function deleteNote(
  noteId: string,
  userId: string,
): Promise<void> {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId: userId,
    },
  });

  if (!note) {
    throw new NotFoundError();
  }

  await prisma.note.delete({ where: { id: noteId } });
}

export async function getAllFilteredNotes(
  userId: string,
  query: GetAllNotesQueryType,
): Promise<PaginatedNotesResult> {
  const { courseId, topicId, search, sort, page, limit } = query;

  const where: Prisma.NoteWhereInput = { userId };
  if (topicId) {
    where.topicId = topicId;
  } else if (courseId) {
    where.courseId = courseId;
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  // default sorting by updatedAt desc
  let orderBy: Prisma.NoteOrderByWithRelationInput[] = [{ updatedAt: "desc" }];
  if (sort) {
    orderBy = sort.split(",").map((field) => {
      const direction = field.startsWith("-") ? "desc" : "asc";
      const fieldName = field.replace(/^-/, "");
      return { [fieldName]: direction };
    });
  }

  const skip = (page - 1) * limit;

  const [notes, totalCount] = await prisma.$transaction([
    prisma.note.findMany({ where, orderBy, skip, take: limit }),
    prisma.note.count({ where }),
  ]);

  return {
    pagination: {
      totalNotes: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    },
    data: notes,
  };
}
