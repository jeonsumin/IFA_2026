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
    port: 3000,
    proxy: {
      // 로컬 개발: /api → dev backend 컨테이너(:9000). prod nginx와 동일하게 /api 접두 제거
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  }
})
