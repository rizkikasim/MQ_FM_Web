import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCategoryMutations } from "../../../src/features/category/model/useCategoryMutations";
import { TestQueryProvider, createTestQueryClient } from "../../helpers/queryWrapper";

vi.mock("../../../src/features/category/api/categoryRepository", () => ({
  categoryRepository: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getAll: vi.fn(),
  },
}));

import { categoryRepository } from "../../../src/features/category/api/categoryRepository";

describe("useCategoryMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create category", async () => {
    categoryRepository.create.mockResolvedValue({ data: { id: 1 } });
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useCategoryMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(() => result.current.create.mutateAsync({ name: "Jazz", description: "Jazz music" }));

    expect(categoryRepository.create).toHaveBeenCalledWith({ name: "Jazz", description: "Jazz music" });
  });

  it("should update category with id", async () => {
    categoryRepository.update.mockResolvedValue({});
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useCategoryMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(() => result.current.update.mutateAsync({ id: "2", data: { name: "Updated" } }));

    expect(categoryRepository.update).toHaveBeenCalledWith("2", { name: "Updated" });
  });

  it("should delete category", async () => {
    categoryRepository.delete.mockResolvedValue({});
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useCategoryMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(() => result.current.remove.mutateAsync(5));

    expect(categoryRepository.delete).toHaveBeenCalledWith(5);
  });

  it("should expose error via extractError", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Duplicate name" } };
    categoryRepository.create.mockRejectedValue(err);
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useCategoryMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(async () => {
      try { await result.current.create.mutateAsync({ name: "Dup" }); } catch (_) {}
    });

    expect(result.current.extractError(result.current.create.error)).toBe("Duplicate name");
  });
});
