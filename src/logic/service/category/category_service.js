import { httpAdmin } from "../../../core/helper/http_admin_client";
import { httpPublic } from "../../../core/helper/http_public_client";

export const CategoryService = {
  create: (data) => httpAdmin.post("/api/admin/categories", data),
  getAll: () => httpPublic.get("/api/categories/"),
  delete: (id) => httpAdmin.delete(`/api/admin/categories/${id}`),
  update: (id, data) => httpAdmin.put(`/api/admin/categories/${id}`, data),
};