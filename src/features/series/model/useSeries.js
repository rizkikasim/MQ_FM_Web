import { useQuery } from "@tanstack/react-query";
import { seriesRepository } from "../api/seriesRepository";
import { queryKeys } from "../../../shared/lib/queryClient";

export const useSeries = () =>
  useQuery({
    queryKey: queryKeys.series,
    queryFn: () => seriesRepository.getAll().then((r) => r.data.data),
  });
