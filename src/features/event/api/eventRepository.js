import { httpAdmin } from "../../../shared/api/httpAdmin";
import { eventListSchema } from "../../../entities/event/schema";

export const eventRepository = {
  getAll: async () => {
    const res = await httpAdmin.get("/api/admin/events/");
    const raw = Array.isArray(res.data?.data) ? res.data.data : [];
    const result = eventListSchema.safeParse(raw);
    return { ...res, data: { ...res.data, data: result.success ? result.data : raw } };
  },
  create: (data) => httpAdmin.post("/api/admin/events/", data),
  update: (id, data) => httpAdmin.put(`/api/admin/events/${id}`, data),
  delete: (id) => httpAdmin.delete(`/api/admin/events/${id}`),
};
