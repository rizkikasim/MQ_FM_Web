import { create } from 'zustand';

export const useLoggerStore = create((set) => ({
    log: {
        type: null, // 'success' | 'error'
        message: '',
        isVisible: false,
    },

    showSuccess: (message) => set({
        log: { type: 'success', message, isVisible: true }
    }),

    showError: (message) => set({
        log: { type: 'error', message, isVisible: true }
    }),

    hideLog: () => set((state) => ({
        log: { ...state.log, isVisible: false }
    })),
}));
