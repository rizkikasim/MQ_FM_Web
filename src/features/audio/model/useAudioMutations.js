import { useMutation, useQueryClient } from "@tanstack/react-query";
import { audioRepository } from "../api/audioRepository";
import { queryKeys, extractError } from "../../../shared/lib/queryClient";

export const useAudioMutations = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => audioRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.audios }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => audioRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.audios }),
  });

  const remove = useMutation({
    mutationFn: (id) => audioRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.audios }),
  });

  return { create, update, remove, extractError };
};
