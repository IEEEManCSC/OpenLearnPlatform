import { useQuery } from "@tanstack/react-query";
import { trackService, Track } from "../services/tracksService";

// 🔹 Hook: Get all tracks list
export const useTracksList = () => {
  return useQuery<Track[]>({
    queryKey: ["tracks"],
    queryFn: () => trackService.getTracksList(),
  });
};

// 🔹 Hook: Get track details by ID
export const useTrackDetails = (trackId: string) => {
  return useQuery<Track>({
    queryKey: ["track", trackId],
    queryFn: () => trackService.getTrackDetails(trackId),
    enabled: !!trackId, // only fetch if trackId is provided
  });
};
