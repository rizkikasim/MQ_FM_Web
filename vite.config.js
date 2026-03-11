import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    css: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://angella-nevoid-becalmingly.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        headers: { 'ngrok-skip-browser-warning': 'true' },
      },
      '/uploads': {
        target: 'https://angella-nevoid-becalmingly.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        headers: { 'ngrok-skip-browser-warning': 'true' },
      },
    },
  },
})