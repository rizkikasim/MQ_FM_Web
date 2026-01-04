import { create } from "zustand";
import { CategoryService } from "../../service/category/category_service";

export const useCreateCategoryStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  createCategory: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await CategoryService.create(data);
      set({ loading: false, success: true, error: null });
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create category";
      set({ loading: false, error: errorMessage, success: false });
      throw err;
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));