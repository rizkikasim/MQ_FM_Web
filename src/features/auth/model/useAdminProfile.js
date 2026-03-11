import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "../api/authRepository";
import { queryKeys } from "../../../shared/lib/queryClient";

export const useAdminProfile = () => {
  const enabled = !!localStorage.getItem("admin_token");

  return useQuery({
    queryKey: queryKeys.adminProfile,
    queryFn: () => authRepository.me().then((r) => r.data.data),
    enabled,
    staleTime: 1000 * 60 * 30,
    retry: false,
  });
};

export const useInvalidateAdmin = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: queryKeys.adminProfile });
};
