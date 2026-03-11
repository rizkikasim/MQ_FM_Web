import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRegisterAdmin } from "../../../src/features/auth/model/useRegisterAdmin";

vi.mock("../../../src/features/auth/api/authRepository", () => ({
  authRepository: {
    register: vi.fn(),
  },
}));

import { authRepository } from "../../../src/features/auth/api/authRepository";

describe("useRegisterAdmin", () => {
  beforeEach(() => {
    useRegisterAdmin.setState({ loading: false, error: null, success: false });
    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    const state = useRegisterAdmin.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.success).toBe(false);
  });

  it("should register successfully", async () => {
    authRepository.register.mockResolvedValue({ data: { message: "OK" } });

    await useRegisterAdmin.getState().registerAdmin({
      fullName: "Admin",
      username: "admin",
      email: "admin@test.com",
      phone: "08123",
      password: "pass123",
    });

    expect(useRegisterAdmin.getState().success).toBe(true);
    expect(useRegisterAdmin.getState().loading).toBe(false);
    expect(useRegisterAdmin.getState().error).toBeNull();
  });

  it("should set error on failed registration", async () => {
    const err = new Error("fail");
    err.response = { data: { message: "Email already exists" } };
    authRepository.register.mockRejectedValue(err);

    await expect(
      useRegisterAdmin.getState().registerAdmin({ email: "dup@test.com" })
    ).rejects.toThrow();

    expect(useRegisterAdmin.getState().error).toBe("Email already exists");
    expect(useRegisterAdmin.getState().success).toBe(false);
  });

  it("should reset state correctly", () => {
    useRegisterAdmin.setState({ loading: true, error: "err", success: true });

    useRegisterAdmin.getState().resetState();

    expect(useRegisterAdmin.getState().loading).toBe(false);
    expect(useRegisterAdmin.getState().error).toBeNull();
    expect(useRegisterAdmin.getState().success).toBe(false);
  });
});
