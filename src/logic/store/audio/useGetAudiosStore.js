import { create } from "zustand";
import { AudioService } from "../../service/audio/audio_service";

export const useGetAudiosStore = create((set) => ({
  audios: [],
  loading: false,
  error: null,

  getAudios: async () => {
    set({ loading: true, error: null });
    try {
      const response = await AudioService.getAll();
      const dataList = Array.isArray(response.data?.data) ? response.data.data : [];
      
      set({ 
        audios: dataList, 
        loading: false, 
        error: null 
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch audios";
      set({ 
        loading: false, 
        audios: [], 
        error: errorMessage 
      });
    }
  },
}));