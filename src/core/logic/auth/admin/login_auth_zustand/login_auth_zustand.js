import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AdminRepository } from "../../../../../repository/auth/admin/admin_repository";
import { LocalStorageHelper } from "../../../../helper/local_storage_helper";

// ===============================
// STORE
// ===============================
export const useLoginAuthAdminStore = create(
  persist(
    (set) => ({
      loading: false,
      error: null,
      success: false,

      token: null,
      admin: null,
      profileTheme: null,

      hydrated: false, // ⬅️ WAJIB untuk fix redirect

      // =============================
      // 🔥 LOGIN ADMIN
      // =============================
      loginAdmin: async (payload) => {
        set({
          loading: true,
          error: null,
          success: false,
        });

        try {
          console.log("🔵 ADMIN LOGIN PAYLOAD:", payload);

          const result = await AdminRepository.login(payload);

          console.log("🟢 ADMIN LOGIN RESULT:", result);

          const admin = result?.data || null;
          const token = admin?.Token || null;
          const profileTheme = admin?.ProfileTheme || null;

          // simpan manual helper (SAMA EXACT KAYAK USER)
          LocalStorageHelper.saveAll({
            token,
            user: admin,
            profileTheme,
          });

          // update Zustand
          set({
            loading: false,
            success: true,
            error: null,
            token,
            admin,
            profileTheme,
          });

          return result;
        } catch (err) {
          console.error("❌ ADMIN LOGIN ERROR:", err);
          console.error("❌ RAW ERROR RESPONSE:", err?.response);

          LocalStorageHelper.clearAll();

          set({
            loading: false,
            error: err?.message || "Login failed",
            success: false,
            token: null,
            admin: null,
            profileTheme: null,
          });

          throw err;
        }
      },

      // =============================
      // 🔥 RESET STATE
      // =============================
      resetState: () =>
        set({
          loading: false,
          error: null,
          success: false,
          token: null,
          admin: null,
          profileTheme: null,
        }),

      // =============================
      // 🔥 SET HYDRATED
      // =============================
      setHydrated: () => set({ hydrated: true }),
    }),

    {
      name: "mqfm_admin_auth",
      getStorage: () => localStorage,

      partialize: (state) => ({
        token: state.token,
        admin: state.admin,
        profileTheme: state.profileTheme,
      }),
    }
  )
);

// ===============================
// FIX HYDRATE — ANTI STRICT MODE
// ===============================
useLoginAuthAdminStore.persist.onFinishHydration(() => {
  useLoginAuthAdminStore.getState().setHydrated();
});
