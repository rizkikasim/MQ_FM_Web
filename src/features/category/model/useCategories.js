import { useQuery } from "@tanstack/react-query";
import { categoryRepository } from "../api/categoryRepository";
import { queryKeys } from "../../../shared/lib/queryClient";

export const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => categoryRepository.getAll().then((r) => r.data.data),
  });
