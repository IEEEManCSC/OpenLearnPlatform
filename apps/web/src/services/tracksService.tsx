import axiosInstance from "../config/axiosInstance";
import { Track } from "../modules/tracks/tracks.interface";
import { ApiResponse } from "../modules/apiResponse/apiResponse.interface";

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
