import { create } from "zustand";
import { authRepository } from "../api/authRepository";

export const useLogoutAdmin = create((set) => ({
  loading: false,

  logoutAdmin: async () => {
    set({ loading: true });
    try {
      await authRepository.logout();
    } catch (_) {}
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    set({ loading: false });
  },
}));
