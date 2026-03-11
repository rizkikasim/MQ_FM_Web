import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAudioMutations } from "../../../src/features/audio/model/useAudioMutations";
import { TestQueryProvider, createTestQueryClient } from "../../helpers/queryWrapper";

vi.mock("../../../src/features/audio/api/audioRepository", () => ({
  audioRepository: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getAll: vi.fn(),
  },
}));

import { audioRepository } from "../../../src/features/audio/api/audioRepository";

describe("useAudioMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create audio and invalidate cache", async () => {
    audioRepository.create.mockResolvedValue({ data: { id: 1 } });
    const qc = createTestQueryClient();
    const invalidateSpy = vi.spyOn(qc, "invalidateQueries");

    const { result } = renderHook(() => useAudioMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(() => result.current.create.mutateAsync(new FormData()));

    expect(audioRepository.create).toHaveBeenCalledTimes(1);
    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("should update audio with id and data", async () => {
    audioRepository.update.mockResolvedValue({});
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useAudioMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(() => result.current.update.mutateAsync({ id: "5", data: new FormData() }));

    expect(audioRepository.update).toHaveBeenCalledWith("5", expect.any(FormData));
  });

  it("should delete audio by id", async () => {
    audioRepository.delete.mockResolvedValue({});
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useAudioMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(() => result.current.remove.mutateAsync(3));

    expect(audioRepository.delete).toHaveBeenCalledWith(3);
  });

  it("should expose error on mutation failure", async () => {
    const err = new Error("Upload failed");
    err.response = { data: { message: "File too large" } };
    audioRepository.create.mockRejectedValue(err);
    const qc = createTestQueryClient();

    const { result } = renderHook(() => useAudioMutations(), {
      wrapper: ({ children }) => <TestQueryProvider client={qc}>{children}</TestQueryProvider>,
    });

    await act(async () => {
      try { await result.current.create.mutateAsync(new FormData()); } catch (_) {}
    });

    expect(result.current.create.error).toBeTruthy();
    expect(result.current.extractError(result.current.create.error)).toBe("File too large");
  });
});
