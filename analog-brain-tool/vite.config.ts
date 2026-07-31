/* eslint-disable import-x/no-default-export */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/analog-brain/',
  build: {
    // Same as default but make sure we have a fixed output dir for CI/CD
    outDir: './dist',
  },
  define: {
    BUILD_MS_TIME_SINCE_EPOCH: JSON.stringify(Date.now()),
  },
});
