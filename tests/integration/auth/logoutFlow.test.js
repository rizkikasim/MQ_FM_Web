import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogoutAdmin } from "../../../src/features/auth/model/useLogoutAdmin";

vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: {
    logout: vi.fn(),
  },
}));

import { authRepository } from "../../../src/features/auth/api/authRepository";

describe("Logout Flow Integration", () => {
  beforeEach(() => {
    useLogoutAdmin.setState({ loading: false });
    vi.clearAllMocks();
  });

  it("should clear token from localStorage on logout", async () => {
    authRepository.logout.mockResolvedValue({});
    localStorage.setItem("admin_token", "existing-token");
    localStorage.setItem("admin_user", "{}");

    await useLogoutAdmin.getState().logoutAdmin();

    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_user");
  });

  it("should clear token even on 401 response", async () => {
    const err = new Error("Unauthorized");
    err.response = { status: 401 };
    authRepository.logout.mockRejectedValue(err);

    localStorage.setItem("admin_token", "expired-token");

    await useLogoutAdmin.getState().logoutAdmin();

    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_token");
  });

  it("should set loading to false after logout", async () => {
    authRepository.logout.mockResolvedValue({});

    await useLogoutAdmin.getState().logoutAdmin();

    expect(useLogoutAdmin.getState().loading).toBe(false);
  });
});
