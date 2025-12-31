import { create } from "zustand";
import { AudioService } from "../../service/audio/audio_service";

export const useCreateAudioStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  createAudio: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await AudioService.create(data);
      set({ loading: false, success: true, error: null });
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to upload audio";
      set({ loading: false, error: errorMessage, success: false });
      throw err;
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));