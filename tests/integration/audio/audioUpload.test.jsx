import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { createTestQueryClient } from "../../helpers/queryWrapper";
import { QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../../src/features/audio/api/audioRepository", () => ({
  audioRepository: { create: vi.fn(), getAll: vi.fn() },
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
import AudioUploadPage from "../../../src/pages/admin/AudioUploadPage";

describe("AudioUploadPage Integration", () => {
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
        <MemoryRouter initialEntries={["/admin/audio/upload"]}>
          <Routes>
            <Route path="/admin/audio/upload" element={<AudioUploadPage />} />
            <Route path="/admin/audio" element={<div>Audio List</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("should render form with category options", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("e.g. Morning Motivation")).toBeInTheDocument();
    });
  });

  it("should submit and navigate on success", async () => {
    audioRepository.create.mockResolvedValue({ data: { id: 10 } });
    renderPage();
    const user = userEvent.setup();

    await waitFor(() => expect(screen.getByPlaceholderText("e.g. Morning Motivation")).toBeInTheDocument());

    await user.type(screen.getByPlaceholderText("e.g. Morning Motivation"), "New Track");
    await user.type(screen.getByPlaceholderText("e.g. Syaikh Hudhaify"), "Artist Name");
    await user.type(screen.getByPlaceholderText("Add a detailed description..."), "Desc");

    await waitFor(() => {
      const selects = screen.getAllByRole("combobox");
      expect(selects[0].querySelectorAll("option").length).toBeGreaterThan(1);
    });
    await user.selectOptions(screen.getAllByRole("combobox")[0], "1");

    const fileInput = document.querySelector('input[accept="audio/*"]');
    await user.upload(fileInput, new File(["audio"], "test.mp3", { type: "audio/mpeg" }));

    await user.click(screen.getByText("Start Upload"));

    await waitFor(() => {
      expect(screen.getByText("Audio List")).toBeInTheDocument();
    });
  });

  it("should show error on upload failure", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "File too large" } };
    audioRepository.create.mockRejectedValue(err);
    renderPage();
    const user = userEvent.setup();

    await waitFor(() => expect(screen.getByPlaceholderText("e.g. Morning Motivation")).toBeInTheDocument());

    await user.type(screen.getByPlaceholderText("e.g. Morning Motivation"), "Track");
    await user.type(screen.getByPlaceholderText("e.g. Syaikh Hudhaify"), "Art");
    await user.type(screen.getByPlaceholderText("Add a detailed description..."), "D");

    await waitFor(() => {
      const selects = screen.getAllByRole("combobox");
      expect(selects[0].querySelectorAll("option").length).toBeGreaterThan(1);
    });
    await user.selectOptions(screen.getAllByRole("combobox")[0], "1");

    const fileInput = document.querySelector('input[accept="audio/*"]');
    await user.upload(fileInput, new File(["x"], "big.mp3", { type: "audio/mpeg" }));

    await user.click(screen.getByText("Start Upload"));

    await waitFor(() => {
      expect(screen.getByText("File too large")).toBeInTheDocument();
    });
  });
});
