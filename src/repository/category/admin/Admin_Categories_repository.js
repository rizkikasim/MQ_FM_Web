import { CategoriesAdminService } from "../../../service/category/admin/Categories_admin_services";

export const AdminCategoriesRepository = {
  create: async (payload) => {
    try {
      const response = await CategoriesAdminService.create(payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // nanti kalau mau tambah getAll, update, delete, tinggal ikuti format ini
};
