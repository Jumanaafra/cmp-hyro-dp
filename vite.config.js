import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Firebase SDK in its own long-cached chunk
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
          // React + Router in a stable vendor chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
