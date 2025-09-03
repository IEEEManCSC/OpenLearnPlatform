export interface Topic {
    id: string;
    name: string;
    content: string;
    courseId?: string;
    order?: number;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }