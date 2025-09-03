import axiosInstance from "../config/axiosInstance";
import { NotesListParams , Note } from "../modules/notes/notes.interface";
import { Pagination } from "../modules/pagination/pagination.interface";
import { ApiResponse } from "../modules/apiResponse/apiResponse.interface";


export const userService = {
  // 🟢 Get list
  getNotesList: async ({
    courseId = "",
    topicId = "",
    search = "",
    sort = "createdAt",
    page = 1,
    limit = 10,
  }: NotesListParams): Promise<{ notes: Note[]; pagination: Pagination }> => {
    const { data } = await axiosInstance.get<ApiResponse<Note[]>>("/notes", {
      params: { courseId, topicId, search, sort, page, limit },
    });

    return {
      notes: data.data,
      pagination: data.pagination!,
    };
  },

  // 🟢 Get details
  getNoteDetails: async (noteId: string): Promise<Note> => {
    const { data } = await axiosInstance.get<ApiResponse<Note>>(
      `/notes/${noteId}`,
    );
    return data.data;
  },

  // 🟢 Create
  createNote: async (newNote: {
    title: string;
    content: string;
    topicId: string;
  }): Promise<Note> => {
    const { data } = await axiosInstance.post<ApiResponse<Note>>(
      "/notes",
      newNote,
    );
    return data.data;
  },

  // 🟢 Update
  updateNote: async (
    noteId: string,
    updatedNote: { title?: string; content?: string },
  ): Promise<Note> => {
    const { data } = await axiosInstance.put<ApiResponse<Note>>(
      `/notes/${noteId}`,
      updatedNote,
    );
    return data.data;
  },

  // 🟢 Delete
  deleteNote: async (noteId: string): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.delete<
      ApiResponse<{ success: boolean }>
    >(`/notes/${noteId}`);
    return data.data;
  },
};
