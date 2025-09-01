import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, NotesListParams } from "../services/notesService";

// 🟢 Get Notes List
export const useNotesList = (params: NotesListParams) => {
  return useQuery({
    queryKey: ["notes", params],
    queryFn: () => userService.getNotesList(params),
  });
};

// 🟢 Get Note Details
export const useNoteDetails = (noteId: string) => {
  return useQuery({
    queryKey: ["note", noteId],
    queryFn: () => userService.getNoteDetails(noteId),
    enabled: !!noteId,
  });
};

// 🟢 Create Note
export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

// 🟢 Update Note
export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteId,
      updatedNote,
    }: {
      noteId: string;
      updatedNote: { title?: string; content?: string };
    }) => userService.updateNote(noteId, updatedNote),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", data.id] });
    },
  });
};

// 🟢 Delete Note
export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: string) => userService.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
