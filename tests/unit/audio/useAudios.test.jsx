import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAudios } from "../../../src/features/audio/model/useAudios";
import { TestQueryProvider, createTestQueryClient } from "../../helpers/queryWrapper";

vi.mock("../../../src/features/audio/api/audioRepository", () => ({
  audioRepository: {
    getAll: vi.fn(),
  },
}));

import { audioRepository } from "../../../src/features/audio/api/audioRepository";

describe("useAudios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return empty array initially while loading", () => {
    audioRepository.getAll.mockReturnValue(new Promise(() => {}));
    const qc = createTestQueryClient();
    const { result } = renderHook(() => useAudios(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch and return audio list", async () => {
    const mockAudios = [
      { id: 1, title: "Track 1", category_id: 1, description: null },
      { id: 2, title: "Track 2", category_id: 2, description: "desc" },
    ];
    audioRepository.getAll.mockResolvedValue({ data: { data: mockAudios } });

    const qc = createTestQueryClient();
    const { result } = renderHook(() => useAudios(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].title).toBe("Track 1");
  });

  it("should handle fetch error", async () => {
    audioRepository.getAll.mockRejectedValue(new Error("Network error"));

    const qc = createTestQueryClient();
    const { result } = renderHook(() => useAudios(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error.message).toBe("Network error");
  });
});
