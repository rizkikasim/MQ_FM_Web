import { create } from "zustand";
import { AuthService } from "../../service/auth/Auth_Service";

export const useLoginAdminStore = create((set) => ({
  loading: false,
  error: null,
  success: false,
  user: null,

  loginAdmin: async (payload) => {
    set({ loading: true, error: null, success: false });

    try {
      const response = await AuthService.login(payload);
      const { token, ...userData } = response.data.data;

      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", JSON.stringify(userData));

      set({
        loading: false,
        success: true,
        user: userData,
        error: null,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";

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