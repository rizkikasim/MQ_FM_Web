import { http } from "../../../core/helper/http_client";
import { API } from "../../../core/constant/api_constant";

export const CategoriesUserService = {
  getAll: async () => {
    return http.get(
      `${API.BASE_URL}/podcast/user/categories/all`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  },
};
