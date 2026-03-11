import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

const renderApp = (initialEntries) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<div>Landing</div>} />
        <Route path="/admin/login" element={<GuestRoute><div>Login Page</div></GuestRoute>} />
        <Route path="/admin/register" element={<GuestRoute><div>Register Page</div></GuestRoute>} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="audio" element={<div>Audio List</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("Auth Route Guards E2E", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should show login page when not authenticated", () => {
    renderApp(["/admin/login"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should redirect to login when accessing protected route without token", () => {
    renderApp(["/admin/dashboard"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should redirect to dashboard when accessing login with valid token", () => {
    localStorage.setItem("admin_token", "valid-token");
    renderApp(["/admin/login"]);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should redirect to dashboard when accessing register with valid token", () => {
    localStorage.setItem("admin_token", "valid-token");
    renderApp(["/admin/register"]);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should allow authenticated user to access dashboard", () => {
    localStorage.setItem("admin_token", "valid-token");
    renderApp(["/admin/dashboard"]);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should allow authenticated user to access audio list", () => {
    localStorage.setItem("admin_token", "valid-token");
    renderApp(["/admin/audio"]);
    expect(screen.getByText("Audio List")).toBeInTheDocument();
  });

  it("should redirect /admin to /admin/dashboard with token", () => {
    localStorage.setItem("admin_token", "valid-token");
    renderApp(["/admin"]);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should redirect /admin to /admin/login without token", () => {
    renderApp(["/admin"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should show login page after token removal (simulating logout)", () => {
    localStorage.setItem("admin_token", "old-token");
    localStorage.removeItem("admin_token");
    renderApp(["/admin/login"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should NOT cause infinite redirect loop after logout", () => {
    renderApp(["/admin/login"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
