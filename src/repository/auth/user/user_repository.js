import { AuthService } from "../../../service/auth/user/auth_service";

export const UserRepository = {
  register: async (payload) => {
    try {
      const response = await AuthService.register(payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  login: async (payload) => {
    try {
      const response = await AuthService.login(payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // 🔥 LOGOUT
logout: async () => {
  try {
    const response = await AuthService.logout();
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

};
