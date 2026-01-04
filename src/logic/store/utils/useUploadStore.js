import { create } from 'zustand';

export const useUploadStore = create((set) => ({
    audioFile: null,
    imageFile: null,
    previewImage: null,
    uploading: false,
    progress: 0,

    setAudioFile: (file) => set({ audioFile: file }),

    setImageFile: (file) => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            set({ imageFile: file, previewImage: objectUrl });
        } else {
            set({ imageFile: null, previewImage: null });
        }
    },

    setUploading: (isUploading) => set({ uploading: isUploading }),

    setProgress: (progress) => set({ progress }),

    resetFiles: () => set((state) => {
        if (state.previewImage) {
            URL.revokeObjectURL(state.previewImage);
        }
        return {
            audioFile: null,
            imageFile: null,
            previewImage: null,
            uploading: false,
            progress: 0
        };
    }),
}));
