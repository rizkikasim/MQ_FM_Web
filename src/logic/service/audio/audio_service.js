import { httpAdmin } from "../../../core/helper/http_admin_client";
import { httpPublic } from "../../../core/helper/http_public_client";

export const AudioService = {
  create: (data) => httpAdmin.post("/api/admin/audios/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  getAll: () => httpPublic.get("/api/audios/"),
  delete: (id) => httpAdmin.delete(`/api/admin/audios/${id}`),
  update: (id, data) => httpAdmin.put(`/api/admin/audios/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
};