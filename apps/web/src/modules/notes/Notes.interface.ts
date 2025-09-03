export interface Note {
    id: string;
    title: string;
    content: string;
    topicId: string;
    userId: string; // موجود في schema
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NotesListParams {
    courseId?: string;
    topicId?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }