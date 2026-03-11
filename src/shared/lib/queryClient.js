import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const queryKeys = {
  audios: ["audios"],
  categories: ["categories"],
  playlists: ["playlists"],
  events: ["events"],
  series: ["series"],
  adminProfile: ["admin", "profile"],
};

export const extractError = (error) =>
  error?.response?.data?.message || error?.message || null;
