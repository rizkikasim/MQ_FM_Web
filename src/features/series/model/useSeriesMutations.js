import { useMutation, useQueryClient } from "@tanstack/react-query";
import { seriesRepository } from "../api/seriesRepository";
import { queryKeys, extractError } from "../../../shared/lib/queryClient";

export const useSeriesMutations = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => seriesRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.series }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => seriesRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.series }),
  });

  const remove = useMutation({
    mutationFn: (id) => seriesRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.series }),
  });

  const addItem = useMutation({
    mutationFn: ({ seriesId, audioId, orderNum }) => seriesRepository.addItem(seriesId, audioId, orderNum),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.series }),
  });

  const removeItem = useMutation({
    mutationFn: ({ seriesId, audioId }) => seriesRepository.removeItem(seriesId, audioId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.series }),
  });

  return { create, update, remove, addItem, removeItem, extractError };
};
