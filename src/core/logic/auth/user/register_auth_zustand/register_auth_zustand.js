import { create } from "zustand";
import { UserRepository } from "../../../../../repository/auth/user/user_repository";

export const useRegisterAuthStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  registerUser: async (payload) => {
    set({ loading: true, error: null, success: false });

    try {
      const result = await UserRepository.register(payload);

      set({
        loading: false,
        success: true,
        error: null,
      });

      return result;
    } catch (err) {
      set({
        loading: false,
        error: err?.message || "Registration failed",
        success: false,
      });

      throw err;
    }
  },

  resetState: () =>
    set({
      loading: false,
      error: null,
      success: false,
    }),
}));
