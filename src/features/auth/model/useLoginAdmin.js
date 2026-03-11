import { create } from "zustand";
import { authRepository } from "../api/authRepository";

export const useLoginAdmin = create((set) => ({
  loading: false,
  error: null,
  success: false,
  user: null,

  loginAdmin: async (payload) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await authRepository.login(payload);
      const { token, ...userData } = response.data.data;
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", JSON.stringify(userData));
      set({ loading: false, success: true, user: userData, error: null });
      return response.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message || "Login failed",
        success: false,
      });
      throw err;
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));
