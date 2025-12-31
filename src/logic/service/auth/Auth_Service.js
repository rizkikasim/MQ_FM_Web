import { httpAdmin } from "../../../core/helper/http_admin_client";

export const AuthService = {
  register: (data) => httpAdmin.post(`/api/admin/auth/register`, data),
  login: (data) => httpAdmin.post(`/api/admin/auth/login`, data),
  me: () => httpAdmin.get(`/api/admin/auth/me`),
  logout: () => httpAdmin.post(`/api/admin/auth/logout`),
};