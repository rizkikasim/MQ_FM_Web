import { create } from "zustand";
import { authRepository } from "../api/authRepository";

export const useRegisterAdmin = create((set) => ({
  loading: false,
  error: null,
  success: false,

  registerAdmin: async (payload) => {
    set({ loading: true, error: null, success: false });
    try {
      await authRepository.register(payload);
      set({ loading: false, success: true, error: null });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message || "Registration failed",
        success: false,
      });
      throw err;
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));
