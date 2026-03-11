import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLoginAdmin } from "../../../src/features/auth/model/useLoginAdmin";

vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: {
    login: vi.fn(),
  },
}));

import { authRepository } from "../../../src/features/auth/api/authRepository";

describe("useLoginAdmin", () => {
  beforeEach(() => {
    useLoginAdmin.setState({ loading: false, error: null, success: false, user: null });
    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    const state = useLoginAdmin.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.success).toBe(false);
    expect(state.user).toBeNull();
  });

  it("should set loading to true during login", async () => {
    authRepository.login.mockImplementation(() => new Promise(() => {}));

    useLoginAdmin.getState().loginAdmin({ email: "a@b.com", password: "123" });

    expect(useLoginAdmin.getState().loading).toBe(true);
  });

  it("should store token and user on successful login", async () => {
    const mockResponse = {
      data: {
        data: { token: "test-token-abc", username: "admin", email: "admin@test.com" },
      },
    };
    authRepository.login.mockResolvedValue(mockResponse);

    await useLoginAdmin.getState().loginAdmin({ email: "admin@test.com", password: "pass" });

    expect(localStorage.setItem).toHaveBeenCalledWith("admin_token", "test-token-abc");
    expect(localStorage.setItem).toHaveBeenCalledWith("admin_user", JSON.stringify({ username: "admin", email: "admin@test.com" }));
    expect(useLoginAdmin.getState().success).toBe(true);
    expect(useLoginAdmin.getState().user).toEqual({ username: "admin", email: "admin@test.com" });
    expect(useLoginAdmin.getState().loading).toBe(false);
    expect(useLoginAdmin.getState().error).toBeNull();
  });

  it("should set error on failed login", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Invalid credentials" } };
    authRepository.login.mockRejectedValue(err);

    await expect(
      useLoginAdmin.getState().loginAdmin({ email: "bad", password: "bad" })
    ).rejects.toThrow();

    expect(useLoginAdmin.getState().error).toBe("Invalid credentials");
    expect(useLoginAdmin.getState().success).toBe(false);
    expect(useLoginAdmin.getState().loading).toBe(false);
  });

  it("should fallback to err.message when response has no message", async () => {
    const err = new Error("Network Error");
    authRepository.login.mockRejectedValue(err);

    await expect(
      useLoginAdmin.getState().loginAdmin({ email: "a", password: "b" })
    ).rejects.toThrow();

    expect(useLoginAdmin.getState().error).toBe("Network Error");
  });

  it("should reset state correctly", () => {
    useLoginAdmin.setState({ loading: true, error: "some error", success: true });

    useLoginAdmin.getState().resetState();

    expect(useLoginAdmin.getState().loading).toBe(false);
    expect(useLoginAdmin.getState().error).toBeNull();
    expect(useLoginAdmin.getState().success).toBe(false);
  });
});
