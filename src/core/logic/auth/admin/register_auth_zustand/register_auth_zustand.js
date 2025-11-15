import { create } from "zustand";
import { AdminRepository } from "../../../../../repository/auth/admin/admin_repository";

export const useRegisterAuthAdminStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  registerAdmin: async (payload) => {
    set({ loading: true, error: null, success: false });

    try {
      const result = await AdminRepository.register(payload);

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
