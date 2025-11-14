import { API } from "../../../core/constant/api_constant";
import { http } from "../../../core/helper/http_client";

export const AuthService = {
  register: (data) => http.post(`${API.BASE_URL}/auth/user/register`, data),
  login: (data) => http.post(`${API.BASE_URL}/auth/user/login`, data),
  logout: () => http.post(`${API.BASE_URL}/auth/user/logout`), // clean
};
