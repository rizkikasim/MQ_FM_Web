import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistRepository } from "../api/playlistRepository";
import { queryKeys, extractError } from "../../../shared/lib/queryClient";

export const usePlaylistMutations = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => playlistRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.playlists }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => playlistRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.playlists }),
  });

  const remove = useMutation({
    mutationFn: (id) => playlistRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.playlists }),
  });

  const addAudio = useMutation({
    mutationFn: ({ playlistId, audioId }) => playlistRepository.addAudio(playlistId, audioId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.playlists }),
  });

  const removeAudio = useMutation({
    mutationFn: ({ playlistId, audioId }) => playlistRepository.removeAudio(playlistId, audioId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.playlists }),
  });

  return { create, update, remove, addAudio, removeAudio, extractError };
};
