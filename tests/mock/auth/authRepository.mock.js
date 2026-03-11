import { vi } from "vitest";

export const mockAuthRepository = {
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  me: vi.fn(),
};

export const createLoginSuccessResponse = (overrides = {}) => ({
  data: {
    data: {
      token: "mock-token-123",
      username: "admin",
      email: "admin@mqfm.com",
      ...overrides,
    },
  },
});

export const createLoginErrorResponse = (message = "Invalid credentials") => {
  const error = new Error(message);
  error.response = { data: { message }, status: 401 };
  return error;
};

export const createMeResponse = (overrides = {}) => ({
  data: {
    data: {
      id: 1,
      username: "admin",
      email: "admin@mqfm.com",
      ...overrides,
    },
  },
});

export const createRegisterSuccessResponse = () => ({
  data: { message: "Registration successful" },
});
