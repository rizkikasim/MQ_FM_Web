import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryRepository } from "../api/categoryRepository";
import { queryKeys, extractError } from "../../../shared/lib/queryClient";

export const useCategoryMutations = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => categoryRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.categories }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => categoryRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.categories }),
  });

  const remove = useMutation({
    mutationFn: (id) => categoryRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.categories }),
  });

  return { create, update, remove, extractError };
};
