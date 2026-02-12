import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfoliomultiverse/',
  plugins: [react(), glsl()],
  server: {
    host: true,
    port: 3000,
  },
  optimizeDeps: {
    include: ['three'],
  },
})
