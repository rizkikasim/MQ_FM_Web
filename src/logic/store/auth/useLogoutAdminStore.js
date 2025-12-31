import { create } from "zustand";
import { AuthService } from "../../service/auth/Auth_Service";

export const useLogoutAdminStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  logoutAdmin: async () => {
    set({ loading: true, error: null, success: false });

    try {
      const response = await AuthService.logout();

      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      set({
        loading: false,
        success: true,
        error: null,
      });

      return response.data;
    } catch (err) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      
      const errorMessage = err.response?.data?.message || err.message || "Logout failed";

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