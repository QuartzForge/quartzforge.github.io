/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  resolve: {
    // The shadcn ui/ components import their helper through the "@/*" path
    // declared in tsconfig; without the alias the build cannot resolve them.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue(), tailwindcss()],
  // GitHub Pages serves the built SPA: deep links (/docs, /quartz) 404 at
  // the file level, so the fallback page is a copy of index.html and the
  // router takes over from there.
  appType: 'spa',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        '404': '404.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
