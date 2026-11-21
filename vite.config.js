import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/invitaciones-personales/',

  plugins: [react(), tailwindcss()],

  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})