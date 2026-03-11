import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useLoginAdmin } from "../../../src/features/auth/model/useLoginAdmin";

vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: {
    login: vi.fn(),
  },
}));

vi.mock("../../../src/shared/data/carouselItems", () => ({
  carouselItems: [
    { title: "Slide 1", subtitle: "Sub 1", image: "/img1.jpg" },
  ],
}));

import { authRepository } from "../../../src/features/auth/api/authRepository";
import LoginPage from "../../../src/pages/admin/LoginPage";

const renderLoginPage = (initialEntries = ["/admin/login"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("Login Flow Integration", () => {
  beforeEach(() => {
    useLoginAdmin.setState({ loading: false, error: null, success: false, user: null });
    vi.clearAllMocks();
  });

  it("should render login form", () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText("example@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter admin password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("should show error on failed login", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Invalid credentials" } };
    authRepository.login.mockRejectedValue(err);

    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("example@example.com"), "bad@test.com");
    await user.type(screen.getByPlaceholderText("Enter admin password"), "wrong");
    await user.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("should show success message on successful login", async () => {
    const mockResponse = {
      data: { data: { token: "tok-123", username: "admin", email: "admin@test.com" } },
    };
    authRepository.login.mockResolvedValue(mockResponse);

    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("example@example.com"), "admin@test.com");
    await user.type(screen.getByPlaceholderText("Enter admin password"), "correct");
    await user.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(screen.getByText("Login successful! Redirecting...")).toBeInTheDocument();
    });
  });

  it("should store token in localStorage after login", async () => {
    const mockResponse = {
      data: { data: { token: "stored-token", username: "admin", email: "a@b.com" } },
    };
    authRepository.login.mockResolvedValue(mockResponse);

    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("example@example.com"), "a@b.com");
    await user.type(screen.getByPlaceholderText("Enter admin password"), "pass");
    await user.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("admin_token", "stored-token");
    });
  });
});
