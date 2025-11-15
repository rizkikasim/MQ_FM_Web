import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRepository } from "../../../../../repository/auth/user/user_repository";
import { LocalStorageHelper } from "../../../../helper/local_storage_helper";

export const useLoginAuthStore = create(
  persist(
    (set) => ({
      loading: false,
      error: null,
      success: false,

      token: null,
      user: null,
      profileTheme: null,

      // ====================================
      // 🔥 LOGIN USER
      // ====================================
      loginUser: async (payload) => {
        set({
          loading: true,
          error: null,
          success: false,
        });

        try {
          const result = await UserRepository.login(payload);

          const user = result?.data || null;
          const token = user?.Token || null;
          const profileTheme = user?.ProfileTheme || null;

          // simpan ke localStorage custom helper lu
          LocalStorageHelper.saveAll({ token, user, profileTheme });

          // update Zustand
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

      // ====================================
      // 🔥 RESET STATE
      // ====================================
      resetState: () =>
        set({
          loading: false,
          error: null,
          success: false,
          token: null,
          user: null,
          profileTheme: null,
        }),
    }),

    {
      name: "mqfm_user_auth", // localStorage key
      getStorage: () => localStorage,

      // 🔥 biar Zustand gak override data localStorage saat init
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        profileTheme: state.profileTheme,
      }),
    }
  )
);
