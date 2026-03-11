import { httpAdmin } from "../../../shared/api/httpAdmin";
import { playlistListSchema } from "../../../entities/playlist/schema";

export const playlistRepository = {
  getAll: async () => {
    const res = await httpAdmin.get("/api/admin/playlists/");
    const raw = Array.isArray(res.data?.data) ? res.data.data : [];
    const result = playlistListSchema.safeParse(raw);
    return { ...res, data: { ...res.data, data: result.success ? result.data : raw } };
  },
  create: (data) => httpAdmin.post("/api/admin/playlists/", data),
  update: (id, data) => httpAdmin.put(`/api/admin/playlists/${id}`, data),
  delete: (id) => httpAdmin.delete(`/api/admin/playlists/${id}`),
  addAudio: (playlistId, audioId) => httpAdmin.post("/api/admin/playlists/add-audio", { playlist_id: playlistId, audio_id: audioId }),
  removeAudio: (playlistId, audioId) => httpAdmin.post("/api/admin/playlists/remove-audio", { playlist_id: playlistId, audio_id: audioId }),
};
