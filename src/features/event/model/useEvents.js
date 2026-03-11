import { useQuery } from "@tanstack/react-query";
import { eventRepository } from "../api/eventRepository";
import { queryKeys } from "../../../shared/lib/queryClient";

export const useEvents = () =>
  useQuery({
    queryKey: queryKeys.events,
    queryFn: () => eventRepository.getAll().then((r) => r.data.data),
  });
