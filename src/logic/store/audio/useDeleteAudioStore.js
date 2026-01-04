import { create } from "zustand";
import { AudioService } from "../../service/audio/audio_service";

export const useDeleteAudioStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  deleteAudio: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      await AudioService.delete(id);
      set({ loading: false, success: true, error: null });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete audio";
      set({ loading: false, error: errorMessage, success: false });
      throw err;
    }
  },
}));