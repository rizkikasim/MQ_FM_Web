import { API } from "../../../core/constant/api_constant";
import { http } from "../../../core/helper/http_client";

export const CategoriesAdminService = {
  create: (data) =>
    http.post(`${API.BASE_URL}/podcast/admin/categories/create`, data),
};
