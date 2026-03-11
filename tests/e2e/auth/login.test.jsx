import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
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

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

const renderFullFlow = () =>
  render(
    <MemoryRouter initialEntries={["/admin/login"]}>
      <Routes>
        <Route path="/admin/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route path="dashboard" element={<div>Dashboard Loaded</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("Login E2E Flow", () => {
  beforeEach(() => {
    useLoginAdmin.setState({ loading: false, error: null, success: false, user: null });
    vi.clearAllMocks();
  });

  it("should login and redirect to dashboard", async () => {
    authRepository.login.mockResolvedValue({
      data: { data: { token: "new-token", username: "admin", email: "a@b.com" } },
    });

    renderFullFlow();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("example@example.com"), "admin@test.com");
    await user.type(screen.getByPlaceholderText("Enter admin password"), "pass123");
    await user.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(screen.getByText("Login successful! Redirecting...")).toBeInTheDocument();
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("admin_token", "new-token");
  });

  it("should show error and stay on login page on failure", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Wrong password" } };
    authRepository.login.mockRejectedValue(err);

    renderFullFlow();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("example@example.com"), "a@b.com");
    await user.type(screen.getByPlaceholderText("Enter admin password"), "bad");
    await user.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(screen.getByText("Wrong password")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("example@example.com")).toBeInTheDocument();
  });

  it("should show loading state during login", async () => {
    let resolveLogin;
    authRepository.login.mockImplementation(
      () => new Promise((resolve) => { resolveLogin = resolve; })
    );

    renderFullFlow();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("example@example.com"), "a@b.com");
    await user.type(screen.getByPlaceholderText("Enter admin password"), "pass");
    await user.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(screen.getByText("Signing in...")).toBeInTheDocument();
    });

    resolveLogin({
      data: { data: { token: "tok", username: "admin", email: "a@b.com" } },
    });
  });
});
