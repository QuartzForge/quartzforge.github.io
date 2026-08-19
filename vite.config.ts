/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
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
