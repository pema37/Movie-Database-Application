import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite-movie-app/",
  build: {
    outDir: 'vite-movie-app'
  },
  plugins: [react()],
})
