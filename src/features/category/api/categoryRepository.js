import { httpAdmin } from "../../../shared/api/httpAdmin";
import { httpPublic } from "../../../shared/api/httpPublic";
import { categoryListSchema } from "../../../entities/category/schema";

export const categoryRepository = {
  create: (data) => httpAdmin.post("/api/admin/categories/", data),
  getAll: async () => {
    const res = await httpPublic.get("/api/categories/");
    const raw = Array.isArray(res.data?.data) ? res.data.data : [];
    const result = categoryListSchema.safeParse(raw);
    return { ...res, data: { ...res.data, data: result.success ? result.data : raw } };
  },
  delete: (id) => httpAdmin.delete(`/api/admin/categories/${id}`),
  update: (id, data) => httpAdmin.put(`/api/admin/categories/${id}`, data),
};
