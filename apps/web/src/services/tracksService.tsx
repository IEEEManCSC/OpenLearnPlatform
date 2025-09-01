import axiosInstance from "../config/axiosInstance";

// ✅ Track interface
export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
  pagination?: Pagination;
}

export const trackService = {
  // 🟢 Get tracks list
  getTracksList: async (): Promise<Track[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Track[]>>("/tracks");
    return data.data;
  },

  // 🟢 Get track details
  getTrackDetails: async (trackId: string): Promise<Track> => {
    const { data } = await axiosInstance.get<ApiResponse<Track>>(
      `/tracks/${trackId}`,
    );
    return data.data;
  },
};
