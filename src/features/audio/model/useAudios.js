import { useQuery } from "@tanstack/react-query";
import { audioRepository } from "../api/audioRepository";
import { queryKeys } from "../../../shared/lib/queryClient";

export const useAudios = () =>
  useQuery({
    queryKey: queryKeys.audios,
    queryFn: () => audioRepository.getAll().then((r) => r.data.data),
  });
