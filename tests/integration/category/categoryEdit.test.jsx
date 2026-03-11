import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { createTestQueryClient } from "../../helpers/queryWrapper";
import { QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../../src/features/category/api/categoryRepository", () => ({
  categoryRepository: { update: vi.fn(), getAll: vi.fn() },
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
import CategoryEditPage from "../../../src/pages/admin/CategoryEditPage";

const mockCategory = { id: 5, name: "Kajian", image: "/uploads/cat.jpg" };

describe("CategoryEditPage Integration", () => {
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
        <MemoryRouter initialEntries={[{ pathname: "/admin/category/edit/5", state: { category: mockCategory } }]}>
          <Routes>
            <Route path="/admin/category/edit/:id" element={<CategoryEditPage />} />
            <Route path="/admin/category" element={<div>Category List</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("should prefill form with existing data", () => {
    renderPage();
    expect(screen.getByDisplayValue("Kajian")).toBeInTheDocument();
  });

  it("should submit update and navigate", async () => {
    categoryRepository.update.mockResolvedValue({});
    renderPage();
    const user = userEvent.setup();

    const nameInput = screen.getByDisplayValue("Kajian");
    await user.clear(nameInput);
    await user.type(nameInput, "Updated");
    await user.click(screen.getByText("Update Category"));

    await waitFor(() => {
      expect(screen.getByText("Category List")).toBeInTheDocument();
    });
  });

  it("should show error on failure", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Not found" } };
    categoryRepository.update.mockRejectedValue(err);
    renderPage();
    const user = userEvent.setup();

    await user.click(screen.getByText("Update Category"));

    await waitFor(() => {
      expect(screen.getByText("Not found")).toBeInTheDocument();
    });
  });
});
