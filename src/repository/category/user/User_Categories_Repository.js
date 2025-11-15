import { CategoriesUserService } from "../../../service/category/user/Categories_User_Service";

export const UserCategoriesRepository = {
  getAll: async () => {
    try {
      const response = await CategoriesUserService.getAll();
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // nanti kalau mau tambah getById, search, dsb tinggal ikuti format ini
};
