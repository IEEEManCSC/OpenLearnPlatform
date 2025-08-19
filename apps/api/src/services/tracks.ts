import { prisma } from "../lib/prisma.js";

export const getAllTracks = async () => {
  const tracks = await prisma.track.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return tracks;
};

export const getTrack = async (trackId: string) => {
  const track = await prisma.track.findUnique({
    where: {
      id: trackId,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  return track;
};
