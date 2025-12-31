import { create } from "zustand";
import { AudioService } from "../../service/audio/audio_service";

export const useUpdateAudioStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  updateAudio: async (id, data) => {
    set({ loading: true, error: null, success: false });
    try {
      await AudioService.update(id, data);
      set({ loading: false, success: true, error: null });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update audio";
      set({ loading: false, error: errorMessage, success: false });
      throw err;
    }
  },
}));