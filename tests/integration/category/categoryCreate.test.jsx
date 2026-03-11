import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { createTestQueryClient } from "../../helpers/queryWrapper";
import { QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../../src/features/category/api/categoryRepository", () => ({
  categoryRepository: { create: vi.fn(), getAll: vi.fn() },
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

import { categoryRepository } from "../../../src/features/category/api/categoryRepository";
import { authRepository } from "../../../src/features/auth/api/authRepository";
import CategoryCreatePage from "../../../src/pages/admin/CategoryCreatePage";

describe("CategoryCreatePage Integration", () => {
  let qc;

  beforeEach(() => {
    vi.clearAllMocks();
    qc = createTestQueryClient();
    localStorage.setItem("admin_token", "test-token");
    authRepository.me.mockResolvedValue({ data: { data: { id: 1, username: "admin", email: "a@b.com" } } });
  });

  const renderPage = () =>
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={["/admin/category/create"]}>
          <Routes>
            <Route path="/admin/category/create" element={<CategoryCreatePage />} />
            <Route path="/admin/category" element={<div>Category List</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("should render category form", () => {
    renderPage();
    expect(screen.getByText("Add New Category")).toBeInTheDocument();
  });

  it("should submit and navigate on success", async () => {
    categoryRepository.create.mockResolvedValue({ data: { id: 1 } });
    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("e.g. Kajian Subuh"), "Kajian");
    await user.click(screen.getByText("Save Category"));

    await waitFor(() => {
      expect(screen.getByText("Category List")).toBeInTheDocument();
    });
  });

  it("should show error on failure", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Name already exists" } };
    categoryRepository.create.mockRejectedValue(err);
    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("e.g. Kajian Subuh"), "Dup");
    await user.click(screen.getByText("Save Category"));

    await waitFor(() => {
      expect(screen.getByText("Name already exists")).toBeInTheDocument();
    });
  });
});
