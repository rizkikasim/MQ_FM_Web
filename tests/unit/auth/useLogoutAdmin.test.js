import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogoutAdmin } from "../../../src/features/auth/model/useLogoutAdmin";

vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: {
    logout: vi.fn(),
  },
}));

import { authRepository } from "../../../src/features/auth/api/authRepository";

describe("useLogoutAdmin", () => {
  beforeEach(() => {
    useLogoutAdmin.setState({ loading: false });
    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    expect(useLogoutAdmin.getState().loading).toBe(false);
  });

  it("should clear localStorage on successful logout", async () => {
    authRepository.logout.mockResolvedValue({});
    localStorage.setItem("admin_token", "tok");
    localStorage.setItem("admin_user", "{}");

    await useLogoutAdmin.getState().logoutAdmin();

    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_user");
    expect(useLogoutAdmin.getState().loading).toBe(false);
  });

  it("should clear localStorage even when API call fails", async () => {
    authRepository.logout.mockRejectedValue(new Error("401"));

    await useLogoutAdmin.getState().logoutAdmin();

    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_user");
    expect(useLogoutAdmin.getState().loading).toBe(false);
  });

  it("should set loading during logout", async () => {
    let resolveLogout;
    authRepository.logout.mockImplementation(() => new Promise((r) => { resolveLogout = r; }));

    const promise = useLogoutAdmin.getState().logoutAdmin();
    expect(useLogoutAdmin.getState().loading).toBe(true);

    resolveLogout({});
    await promise;
    expect(useLogoutAdmin.getState().loading).toBe(false);
  });
});
