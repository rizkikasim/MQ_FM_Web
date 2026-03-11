import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { createTestQueryClient } from "../../helpers/queryWrapper";
import { QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../../src/features/audio/api/audioRepository", () => ({
  audioRepository: { update: vi.fn(), getAll: vi.fn() },
}));
vi.mock("../../../src/features/category/api/categoryRepository", () => ({
  categoryRepository: { getAll: vi.fn() },
}));
vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: { me: vi.fn(), logout: vi.fn() },
}));
vi.mock("../../../src/features/playlist/api/playlistRepository", () => ({
  playlistRepository: { getAll: vi.fn() },
}));
vi.mock("../../../src/features/event/api/eventRepository", () => ({
  eventRepository: { getAll: vi.fn() },
}));
vi.mock("../../../src/features/series/api/seriesRepository", () => ({
  seriesRepository: { getAll: vi.fn() },
}));

import { audioRepository } from "../../../src/features/audio/api/audioRepository";
import { categoryRepository } from "../../../src/features/category/api/categoryRepository";
import { authRepository } from "../../../src/features/auth/api/authRepository";
import AudioEditPage from "../../../src/pages/admin/AudioEditPage";

const mockAudio = {
  audio_id: 3,
  title: "Old Track",
  artist: "Old Artist",
  description: "Old description",
  category_id: 1,
  status: "active",
  thumbnail: "thumb.jpg",
};

describe("AudioEditPage Integration", () => {
  let qc;

  beforeEach(() => {
    vi.clearAllMocks();
    qc = createTestQueryClient();
    localStorage.setItem("admin_token", "test-token");
    authRepository.me.mockResolvedValue({ data: { data: { id: 1, username: "admin", email: "a@b.com" } } });
    categoryRepository.getAll.mockResolvedValue({
      data: { data: [{ id: 1, name: "Music" }, { id: 2, name: "Podcast" }] },
    });
  });

  const renderPage = () =>
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={[{ pathname: "/admin/audio/edit/3", state: { audio: mockAudio } }]}>
          <Routes>
            <Route path="/admin/audio/edit/:id" element={<AudioEditPage />} />
            <Route path="/admin/audio" element={<div>Audio List</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("should pre-fill form with existing data", async () => {
    renderPage();
    expect(screen.getByDisplayValue("Old Track")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old Artist")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old description")).toBeInTheDocument();
  });

  it("should submit update and navigate", async () => {
    audioRepository.update.mockResolvedValue({});
    renderPage();
    const user = userEvent.setup();

    const titleInput = screen.getByDisplayValue("Old Track");
    await user.clear(titleInput);
    await user.type(titleInput, "New Track");
    await user.click(screen.getByText("Update Audio"));

    await waitFor(() => {
      expect(audioRepository.update).toHaveBeenCalled();
    });
  });

  it("should show error on failure", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Audio not found" } };
    audioRepository.update.mockRejectedValue(err);
    renderPage();
    const user = userEvent.setup();

    await user.click(screen.getByText("Update Audio"));

    await waitFor(() => {
      expect(screen.getByText("Audio not found")).toBeInTheDocument();
    });
  });
});
