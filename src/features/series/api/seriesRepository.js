import { httpAdmin } from "../../../shared/api/httpAdmin";
import { seriesListSchema } from "../../../entities/series/schema";

export const seriesRepository = {
  getAll: async () => {
    const res = await httpAdmin.get("/api/admin/series/");
    const raw = Array.isArray(res.data?.data) ? res.data.data : [];
    const result = seriesListSchema.safeParse(raw);
    return { ...res, data: { ...res.data, data: result.success ? result.data : raw } };
  },
  create: (data) => httpAdmin.post("/api/admin/series/", data),
  update: (id, data) => httpAdmin.put(`/api/admin/series/${id}`, data),
  delete: (id) => httpAdmin.delete(`/api/admin/series/${id}`),
  addItem: (seriesId, audioId, orderNum) =>
    httpAdmin.post(`/api/admin/series/${seriesId}/items`, { series_id: seriesId, audio_id: audioId, order_num: orderNum }),
  removeItem: (seriesId, audioId) =>
    httpAdmin.delete(`/api/admin/series/${seriesId}/items/${audioId}`),
};
