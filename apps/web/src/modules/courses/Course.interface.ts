import { Topic } from "../topics/topics.interface";

export interface Course {
    id: string;
    name: string;
    description: string;
    level: string;
    topics: Topic[];
    completedPercentage: number;
  }