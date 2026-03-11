import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};

const renderRoutes = (initialEntries) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/admin/login" element={<GuestRoute><div>Login</div></GuestRoute>} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="audio" element={<div>Audio</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("XSS & Route Injection Protection", () => {
  it("should not render XSS payloads in route params", () => {
    localStorage.setItem("admin_token", "tok");
    render(
      <MemoryRouter initialEntries={['/admin/audio/edit/<script>alert("xss")</script>']}>
        <Routes>
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route path="audio/edit/:id" element={<div>Edit Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(document.querySelector("script")).toBeNull();
  });

  it("should not render protected content for unknown admin routes when unauthenticated", () => {
    renderRoutes(["/admin/unknown-page"]);
    expect(screen.queryByText("Dashboard")).toBeNull();
    expect(screen.queryByText("Audio")).toBeNull();
  });

  it("should not allow path traversal in admin routes", () => {
    renderRoutes(["/admin/../admin/dashboard"]);
    expect(screen.queryByText("Dashboard")).toBeNull();
  });

  it("should protect all admin sub-routes without token", () => {
    const routes = ["/admin/dashboard", "/admin/audio", "/admin"];
    routes.forEach((route) => {
      const { unmount } = renderRoutes([route]);
      expect(screen.getByText("Login")).toBeInTheDocument();
      unmount();
    });
  });
});
