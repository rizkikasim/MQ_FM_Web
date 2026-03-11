import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCategories } from "../../../src/features/category/model/useCategories";
import { TestQueryProvider, createTestQueryClient } from "../../helpers/queryWrapper";

vi.mock("../../../src/features/category/api/categoryRepository", () => ({
  categoryRepository: {
    getAll: vi.fn(),
  },
}));

import { categoryRepository } from "../../../src/features/category/api/categoryRepository";

describe("useCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be loading initially", () => {
    categoryRepository.getAll.mockReturnValue(new Promise(() => {}));
    const qc = createTestQueryClient();
    const { result } = renderHook(() => useCategories(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch and return categories", async () => {
    const mockCats = [
      { id: 1, name: "Kajian", description: null },
      { id: 2, name: "Musik", description: "Music category" },
    ];
    categoryRepository.getAll.mockResolvedValue({ data: { data: mockCats } });

    const qc = createTestQueryClient();
    const { result } = renderHook(() => useCategories(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].name).toBe("Kajian");
  });

  it("should handle error", async () => {
    categoryRepository.getAll.mockRejectedValue(new Error("Server down"));
    const qc = createTestQueryClient();
    const { result } = renderHook(() => useCategories(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error.message).toBe("Server down");
  });
});
