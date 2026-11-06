import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the production build works from any sub-path / static host.
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
