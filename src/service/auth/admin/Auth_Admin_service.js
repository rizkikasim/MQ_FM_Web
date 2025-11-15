import { API } from "../../../core/constant/api_constant";
import { http } from "../../../core/helper/http_client";

export const AuthAdminService = {
  register: (data) => http.post(`${API.BASE_URL}/auth/admin/register`, data),
  login: (data) => http.post(`${API.BASE_URL}/auth/admin/login`, data),
  // logout nanti tinggal tambah di sini kalau diperlukan
};
