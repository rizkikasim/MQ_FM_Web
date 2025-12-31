import { create } from "zustand";
import { AuthService } from "../../service/auth/Auth_Service";

export const useRegisterAdminStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  registerAdmin: async (payload) => {
    set({ loading: true, error: null, success: false });

    try {
      const response = await AuthService.register(payload);

      set({
        loading: false,
        success: true,
        error: null,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed";

      set({
        loading: false,
        error: errorMessage,
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