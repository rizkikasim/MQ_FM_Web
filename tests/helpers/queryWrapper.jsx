import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

export const TestQueryProvider = ({ client, children }) => (
  <QueryClientProvider client={client || createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);
