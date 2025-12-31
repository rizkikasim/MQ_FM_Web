import { create } from "zustand";
import { CategoryService } from "../../service/category/category_service";

export const useUpdateCategoryStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  updateCategory: async (id, data) => {
    set({ loading: true, error: null, success: false });
    try {
      await CategoryService.update(id, data);
      set({ loading: false, success: true, error: null });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update category";
      set({ loading: false, error: errorMessage, success: false });
      throw err;
    }
  },
}));