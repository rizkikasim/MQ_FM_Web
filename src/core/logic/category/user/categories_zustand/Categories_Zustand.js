import { create } from "zustand";
import { UserCategoriesRepository } from "../../../../../repository/category/user/User_Categories_Repository";

export const useUserCategoriesStore = create((set) => ({

  loading: false,
  error: null,
  success: false,

  categories: [], // data categories dari user endpoint

  getAllCategories: async () => {
    set({
      loading: true,
      error: null,
      success: false,
    });

    try {
      const result = await UserCategoriesRepository.getAll();

      console.log("🔥 RESULT CATEGORY FROM API:", result); // <-- console yang lu minta

      const categories = result?.data || [];

      // UPDATE ZUSTAND
      set({
        loading: false,
        success: true,
        error: null,
        categories,
      });

      return result;

    } catch (err) {
      console.error("❌ ERROR FETCHING CATEGORIES:", err); // log error biar jelas

      set({
        loading: false,
        error: err?.message || "Failed to load categories",
        success: false,
        categories: [],
      });

      throw err;
    }
  },

  resetState: () =>
    set({
      loading: false,
      error: null,
      success: false,
      categories: [],
    }),
}));
