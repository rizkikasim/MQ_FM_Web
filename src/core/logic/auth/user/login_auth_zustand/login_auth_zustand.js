import { create } from "zustand";
import { UserRepository } from "../../../../../repository/auth/user/user_repository";
import { LocalStorageHelper } from "../../../../helper/local_storage_helper";

export const useLoginAuthStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  token: null,
  user: null,
  profileTheme: null,

  loginUser: async (payload) => {
    set({
      loading: true,
      error: null,
      success: false,
    });

    try {
      const result = await UserRepository.login(payload);

      // ✔ sesuai response backend lu
      const user = result?.data || null;
      const token = user?.Token || null;
      const profileTheme = user?.ProfileTheme || null;

      // ✔ simpan ke localStorage
      LocalStorageHelper.saveAll({ token, user, profileTheme });

      // ✔ update Zustand
      set({
        loading: false,
        success: true,
        error: null,
        token,
        user,
        profileTheme,
      });

      return result;

    } catch (err) {
      LocalStorageHelper.clearAll();

      set({
        loading: false,
        error: err?.message || "Login failed",
        success: false,
        token: null,
        user: null,
        profileTheme: null,
      });

      throw err;
    }
  },

  resetState: () =>
    set({
      loading: false,
      error: null,
      success: false,
      token: null,
      user: null,
      profileTheme: null,
    }),
}));
