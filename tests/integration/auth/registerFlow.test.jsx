import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useRegisterAdmin } from "../../../src/features/auth/model/useRegisterAdmin";

vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: {
    register: vi.fn(),
  },
}));

vi.mock("../../../src/shared/data/carouselItems", () => ({
  carouselItems: [
    { title: "Slide 1", subtitle: "Sub 1", image: "/img1.jpg" },
  ],
}));

import { authRepository } from "../../../src/features/auth/api/authRepository";
import RegisterPage from "../../../src/pages/admin/RegisterPage";

const renderRegisterPage = () =>
  render(
    <MemoryRouter initialEntries={["/admin/register"]}>
      <Routes>
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("Register Flow Integration", () => {
  beforeEach(() => {
    useRegisterAdmin.setState({ loading: false, error: null, success: false });
    vi.clearAllMocks();
  });

  it("should render registration form", () => {
    renderRegisterPage();
    expect(screen.getByPlaceholderText("Enter full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
  });

  it("should show validation error for password mismatch", async () => {
    renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Enter full name"), "Admin");
    await user.type(screen.getByPlaceholderText("Enter username"), "admin");
    await user.type(screen.getByPlaceholderText("Enter phone number"), "08123");
    await user.type(screen.getByPlaceholderText("Enter email address"), "a@b.com");
    await user.type(screen.getByPlaceholderText("Create password"), "pass1");
    await user.type(screen.getByPlaceholderText("Confirm password"), "pass2");
    await user.click(screen.getByText("Create Admin Account"));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    expect(authRepository.register).not.toHaveBeenCalled();
  });

  it("should show success message on successful registration", async () => {
    authRepository.register.mockResolvedValue({ data: { message: "OK" } });

    renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Enter full name"), "Admin");
    await user.type(screen.getByPlaceholderText("Enter username"), "admin");
    await user.type(screen.getByPlaceholderText("Enter phone number"), "08123");
    await user.type(screen.getByPlaceholderText("Enter email address"), "a@b.com");
    await user.type(screen.getByPlaceholderText("Create password"), "pass123");
    await user.type(screen.getByPlaceholderText("Confirm password"), "pass123");
    await user.click(screen.getByText("Create Admin Account"));

    await waitFor(() => {
      expect(screen.getByText("Registration successful! Redirecting...")).toBeInTheDocument();
    });
  });
});
