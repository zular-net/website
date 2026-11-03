import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // The 3D library loads on its own, after the page is usable.
        manualChunks: { three: ['three'] },
      },
    },
  },
});
