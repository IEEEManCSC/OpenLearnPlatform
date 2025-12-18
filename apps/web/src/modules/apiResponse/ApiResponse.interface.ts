import { Pagination } from "../pagination/pagination.interface";

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    timestamp: string;
    data: T;
    pagination?: Pagination;
  }