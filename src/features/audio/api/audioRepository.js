import { httpAdmin } from "../../../shared/api/httpAdmin";
import { httpPublic } from "../../../shared/api/httpPublic";
import { audioListSchema } from "../../../entities/audio/schema";

export const audioRepository = {
  create: (data) => httpAdmin.post("/api/admin/audios/", data),
  getAll: async () => {
    const res = await httpPublic.get("/api/audios/");
    const raw = Array.isArray(res.data?.data) ? res.data.data : [];
    const result = audioListSchema.safeParse(raw);
    return { ...res, data: { ...res.data, data: result.success ? result.data : raw } };
  },
  delete: (id) => httpAdmin.delete(`/api/admin/audios/${id}`),
  update: (id, data) => httpAdmin.put(`/api/admin/audios/${id}`, data),
};
