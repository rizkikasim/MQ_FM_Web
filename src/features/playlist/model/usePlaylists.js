import { useQuery } from "@tanstack/react-query";
import { playlistRepository } from "../api/playlistRepository";
import { queryKeys } from "../../../shared/lib/queryClient";

export const usePlaylists = () =>
  useQuery({
    queryKey: queryKeys.playlists,
    queryFn: () => playlistRepository.getAll().then((r) => r.data.data),
  });
