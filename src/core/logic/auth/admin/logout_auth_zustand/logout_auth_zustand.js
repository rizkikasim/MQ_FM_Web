import { create } from "zustand";

export const useLogoutAuthAdminStore = create((set) => ({

  loading: false,
  error: null,
  success: false,

  logoutAdmin: async () => {
    set({
      loading: true,
      error: null,
      success: false,
    });

    try {
      // 🔥 HAPUS SEMUA LOCAL STORAGE ADMIN
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_data");
      localStorage.removeItem("admin_profile_theme");

      // 🔥 RESET STORE STATE
      set({
        loading: false,
        error: null,
        success: true,
      });

      return true;

    } catch (err) {
      set({
        loading: false,
        error: err?.message || "Logout failed",
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
