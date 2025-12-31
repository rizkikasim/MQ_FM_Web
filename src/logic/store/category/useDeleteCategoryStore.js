import { create } from "zustand";
import { CategoryService } from "../../service/category/category_service";

export const useDeleteCategoryStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  deleteCategory: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      await CategoryService.delete(id);
      set({ loading: false, success: true, error: null });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete category";
      set({ loading: false, error: errorMessage, success: false });
      throw err;
    }
  },
}));