import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventRepository } from "../api/eventRepository";
import { queryKeys, extractError } from "../../../shared/lib/queryClient";

export const useEventMutations = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => eventRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.events }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => eventRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.events }),
  });

  const remove = useMutation({
    mutationFn: (id) => eventRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.events }),
  });

  return { create, update, remove, extractError };
};
