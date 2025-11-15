import { AuthAdminService } from "../../../service/auth/admin/Auth_Admin_service";

export const AdminRepository = {
  register: async (payload) => {
    try {
      const response = await AuthAdminService.register(payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  login: async (payload) => {
    try {
      const response = await AuthAdminService.login(payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // logout nanti tinggal tambah di sini kalau lu butuh
};
