import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/renderer', import.meta.url))
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist/renderer'),
    rollupOptions: {
      external: ['vue', 'wujie', '@ecubus-pro/renderer-plugin-sdk', 'element-plus', '@element-plus/icons-vue'],

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks(id) {
          if (
            id.includes('element-plus/dist/index.css')
          ) {
            return 'element-plus'
          } else if (id.includes('element-plus/theme-chalk/dark/css-vars.css')) {
            return 'element-plus-dark'
          }

        },
      }
    }
  }
})
