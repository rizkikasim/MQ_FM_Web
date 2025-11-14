import { create } from "zustand";
import { UserRepository } from "../../../../../repository/auth/user/user_repository";
import { LocalStorageHelper } from "../../../../helper/local_storage_helper";

export const useLogoutAuthStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  logoutUser: async () => {
    set({ loading: true, error: null, success: false });

    try {
      const result = await UserRepository.logout();

      // clear semua storage
      LocalStorageHelper.clearAll();

      set({
        loading: false,
        success: true,
        error: null,
      });

      return result;
    } catch (err) {
      set({
        loading: false,
        error: err?.message || "Logout gagal",
        success: false,
      });

      throw err;
    }
  }
}));
