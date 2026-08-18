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
      widgets: filePath('widgets'),
      features: filePath('features'),
      entities: filePath('entities'),
      shared: filePath('shared'),
    },
  },
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      // 로컬 개발: /api → dev backend 컨테이너. prod nginx와 동일하게 /api 접두 제거
      '/api': {
        target: 'http://backend',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  }
})
