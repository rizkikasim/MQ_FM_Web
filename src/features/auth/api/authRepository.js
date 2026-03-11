import { httpAdmin } from "../../../shared/api/httpAdmin";
import { adminSchema, loginResponseSchema } from "../../../entities/auth/schema";

export const authRepository = {
  register: (data) => httpAdmin.post("/api/admin/auth/register", data),
  login: async (data) => {
    const res = await httpAdmin.post("/api/admin/auth/login", data);
    loginResponseSchema.parse(res.data?.data || {});
    return res;
  },
  me: async () => {
    const res = await httpAdmin.get("/api/admin/auth/me");
    adminSchema.parse(res.data?.data || {});
    return res;
  },
  logout: () => httpAdmin.post("/api/admin/auth/logout"),
};
