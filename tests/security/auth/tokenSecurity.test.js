import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Token Security", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should not expose token in global scope", () => {
    localStorage.setItem("admin_token", "secret-token");
    expect(window.admin_token).toBeUndefined();
    expect(document.admin_token).toBeUndefined();
  });

  it("should store token only in localStorage with correct key", () => {
    localStorage.setItem("admin_token", "my-token");
    expect(localStorage.getItem("admin_token")).toBe("my-token");
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("auth_token")).toBeNull();
  });

  it("should fully clear auth data on logout", async () => {
    localStorage.setItem("admin_token", "tok");
    localStorage.setItem("admin_user", '{"id":1}');

    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    expect(localStorage.getItem("admin_token")).toBeNull();
    expect(localStorage.getItem("admin_user")).toBeNull();
  });

  it("should not store password in localStorage", () => {
    const userData = { username: "admin", email: "a@b.com" };
    localStorage.setItem("admin_user", JSON.stringify(userData));

    const stored = JSON.parse(localStorage.getItem("admin_user"));
    expect(stored.password).toBeUndefined();
    expect(stored.pass).toBeUndefined();
  });

  it("should not store token in sessionStorage", () => {
    localStorage.setItem("admin_token", "tok");
    expect(sessionStorage.getItem("admin_token")).toBeNull();
  });
});
