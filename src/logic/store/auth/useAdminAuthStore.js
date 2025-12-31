import { create } from "zustand";
import { AuthService } from "../../service/auth/Auth_Service";

export const useAdminAuthStore = create((set) => ({
  admin: null,
  loading: false,
  error: null,

  getMe: async () => {
    set({ loading: true, error: null });

    try {
      const response = await AuthService.me();
      
      set({
        admin: response.data.data,
        loading: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch profile";

      set({
        admin: null,
        loading: false,
        error: errorMessage,
      });

      throw err;
    }
  },

  resetState: () =>
    set({
      admin: null,
      loading: false,
      error: null,
    }),
}));