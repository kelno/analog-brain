/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "/analog-brain",
  build: {
    // make sure we have a fixed out dir for CI/CD
    outDir: './dist',
  },
  define: {
    BUILD_MS_TIME_SINCE_EPOCH: JSON.stringify(Date.now())
  }
})
