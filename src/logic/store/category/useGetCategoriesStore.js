import { create } from "zustand";
import { CategoryService } from "../../service/category/category_service";

export const useGetCategoriesStore = create((set) => ({
  categories: [], // Inisialisasi awal array kosong
  loading: false,
  error: null,

  getCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await CategoryService.getAll();
      // Pastikan data yang masuk adalah array, jika tidak fallback ke []
      const dataList = Array.isArray(response.data?.data) ? response.data.data : [];
      
      set({ 
        categories: dataList, 
        loading: false, 
        error: null 
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch categories";
      set({ 
        loading: false, 
        categories: [], // Reset ke array kosong jika error agar tidak crash di map/filter
        error: errorMessage 
      });
    }
  },
}));