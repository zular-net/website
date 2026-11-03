import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    copyPublicDir: !isSsrBuild,
    // The 3D library loads on its own, after the page is usable.
    rollupOptions: isSsrBuild ? {} : { output: { manualChunks: { three: ['three'] } } },
  },
}));
