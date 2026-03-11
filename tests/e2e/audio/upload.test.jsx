import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
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

const ProtectedRoute = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

describe("Audio Upload E2E Flow", () => {
  let qc;

  beforeEach(() => {
    vi.clearAllMocks();
    qc = createTestQueryClient();
    authRepository.me.mockResolvedValue({ data: { data: { id: 1, username: "admin", email: "a@b.com" } } });
    categoryRepository.getAll.mockResolvedValue({
      data: { data: [{ id: 1, name: "Kajian" }, { id: 2, name: "Musik" }] },
    });
  });

  const renderFlow = () =>
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={["/admin/audio/upload"]}>
          <Routes>
            <Route path="/admin/login" element={<div>Login Page</div>} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route path="audio/upload" element={<AudioUploadPage />} />
              <Route path="audio" element={<div>Audio List Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("should redirect to login when not authenticated", () => {
    renderFlow();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should render upload form when authenticated", () => {
    localStorage.setItem("admin_token", "valid-token");
    renderFlow();
    expect(screen.getByPlaceholderText("e.g. Morning Motivation")).toBeInTheDocument();
  });

  it("should complete full upload: fill → upload → submit → redirect", async () => {
    localStorage.setItem("admin_token", "valid-token");
    audioRepository.create.mockResolvedValue({ data: { id: 10 } });

    renderFlow();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("e.g. Morning Motivation"), "Kajian Subuh");
    await user.type(screen.getByPlaceholderText("e.g. Syaikh Hudhaify"), "Ustadz Ahmad");
    await user.type(screen.getByPlaceholderText("Add a detailed description..."), "Kajian pagi");

    await waitFor(() => {
      const selects = screen.getAllByRole("combobox");
      expect(selects[0].querySelectorAll("option").length).toBeGreaterThan(1);
    });
    await user.selectOptions(screen.getAllByRole("combobox")[0], "1");

    const fileInput = document.querySelector('input[accept="audio/*"]');
    await user.upload(fileInput, new File(["audio-data"], "kajian.mp3", { type: "audio/mpeg" }));

    await user.click(screen.getByText("Start Upload"));

    await waitFor(() => {
      expect(audioRepository.create).toHaveBeenCalledTimes(1);
      const formData = audioRepository.create.mock.calls[0][0];
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get("title")).toBe("Kajian Subuh");
    });

    await waitFor(() => {
      expect(screen.getByText("Audio List Page")).toBeInTheDocument();
    });
  });

  it("should show error and stay on page when upload fails", async () => {
    localStorage.setItem("admin_token", "valid-token");
    const err = new Error("fail");
    err.response = { data: { message: "File size exceeds limit" } };
    audioRepository.create.mockRejectedValue(err);

    renderFlow();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("e.g. Morning Motivation"), "Track");
    await user.type(screen.getByPlaceholderText("e.g. Syaikh Hudhaify"), "Art");
    await user.type(screen.getByPlaceholderText("Add a detailed description..."), "Desc");

    await waitFor(() => {
      const selects = screen.getAllByRole("combobox");
      expect(selects[0].querySelectorAll("option").length).toBeGreaterThan(1);
    });
    await user.selectOptions(screen.getAllByRole("combobox")[0], "1");

    const fileInput = document.querySelector('input[accept="audio/*"]');
    await user.upload(fileInput, new File(["x"], "big.mp3", { type: "audio/mpeg" }));

    await user.click(screen.getByText("Start Upload"));

    await waitFor(() => {
      expect(screen.getByText("File size exceeds limit")).toBeInTheDocument();
    });
  });
});
