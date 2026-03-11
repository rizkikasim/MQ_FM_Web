import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios", () => {
  const interceptors = {
    request: { use: vi.fn(), eject: vi.fn() },
    response: { use: vi.fn(), eject: vi.fn() },
  };
  const instance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors,
  };
  return {
    default: {
      create: vi.fn(() => instance),
    },
  };
});

describe("HTTP Interceptor Security", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should create axios instance with baseURL", async () => {
    const { httpAdmin } = await import("../../../src/shared/api/httpAdmin");
    expect(axios.create).toHaveBeenCalled();
  });

  it("should register request interceptor for auth header", async () => {
    const { httpAdmin } = await import("../../../src/shared/api/httpAdmin");
    expect(httpAdmin.interceptors.request.use).toHaveBeenCalled();
  });

  it("should register response interceptor for 401 handling", async () => {
    const { httpAdmin } = await import("../../../src/shared/api/httpAdmin");
    expect(httpAdmin.interceptors.response.use).toHaveBeenCalled();
  });

  it("request interceptor should add Bearer token from localStorage", async () => {
    vi.resetModules();

    const requestInterceptors = [];
    const responseInterceptors = [];
    const mockInstance = {
      get: vi.fn(),
      post: vi.fn(),
      interceptors: {
        request: { use: vi.fn((fn) => requestInterceptors.push(fn)) },
        response: { use: vi.fn((_, fn) => responseInterceptors.push(fn)) },
      },
    };

    vi.doMock("axios", () => ({
      default: { create: vi.fn(() => mockInstance) },
    }));

    await import("../../../src/shared/api/httpAdmin");

    localStorage.setItem("admin_token", "bearer-test-token");
    const config = { headers: {} };
    const result = requestInterceptors[0](config);

    expect(result.headers.Authorization).toBe("Bearer bearer-test-token");
  });

  it("request interceptor should NOT add auth header when no token", async () => {
    vi.resetModules();

    const requestInterceptors = [];
    const mockInstance = {
      get: vi.fn(),
      post: vi.fn(),
      interceptors: {
        request: { use: vi.fn((fn) => requestInterceptors.push(fn)) },
        response: { use: vi.fn() },
      },
    };

    vi.doMock("axios", () => ({
      default: { create: vi.fn(() => mockInstance) },
    }));

    await import("../../../src/shared/api/httpAdmin");

    const config = { headers: {} };
    const result = requestInterceptors[0](config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it("response interceptor should clear token on 401", async () => {
    vi.resetModules();

    const responseInterceptors = [];
    const mockInstance = {
      get: vi.fn(),
      post: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn((_, fn) => responseInterceptors.push(fn)) },
      },
    };

    vi.doMock("axios", () => ({
      default: { create: vi.fn(() => mockInstance) },
    }));

    await import("../../../src/shared/api/httpAdmin");

    localStorage.setItem("admin_token", "expired-token");
    localStorage.setItem("admin_user", "{}");

    const error = { response: { status: 401 } };
    await expect(responseInterceptors[0](error)).rejects.toEqual(error);

    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("admin_user");
  });
});
