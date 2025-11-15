import { create } from "zustand";
import { AdminCategoriesRepository } from "../../../../../repository/category/admin/Admin_Categories_repository";

export const useCreateCategoriesAdminStore = create((set) => ({

  loading: false,
  error: null,
  success: false,

  createdCategory: null, // untuk nyimpen data kategori yg berhasil dibuat

  createCategory: async (payload) => {
    set({
      loading: true,
      error: null,
      success: false,
    });

    try {
      const result = await AdminCategoriesRepository.create(payload);

      const createdCategory = result?.data || null;

      // UPDATE ZUSTAND
      set({
        loading: false,
        success: true,
        error: null,
        createdCategory,
      });

      return result;
    } catch (err) {
      set({
        loading: false,
        error: err?.message || "Create category failed",
        success: false,
        createdCategory: null,
      });

      throw err;
    }
  },

  resetState: () =>
    set({
      loading: false,
      error: null,
      success: false,
      createdCategory: null,
    }),
}));
