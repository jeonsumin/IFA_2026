import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'path'



const filePath = (...paths: string[]) => path.resolve(__dirname, 'src', ...paths);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      app: filePath('app'),
      pages: filePath('pages'),
      shared: filePath('shared'),
      widget: filePath('widget'),
    },
  },
  server: {
    port: 3000
  }
})
