import { defineConfig } from 'vite'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  publicDir: false,
  plugins: [commonjs()],
  build: {
    outDir: path.resolve(__dirname, 'dist/main'),
    lib: {
      entry: './src/main/index.ts',
      formats: ['cjs'],
      fileName: () => 'index.cjs',
    },
    rollupOptions: {
      external: ["worker_threads", "child_process", "os"],
    }
  }
})

