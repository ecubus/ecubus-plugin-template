import { defineConfig } from 'vite'
import path from 'path'
import { builtinModules } from 'module'


export default defineConfig({
  publicDir: false,

  build: {
    outDir: path.resolve(__dirname, 'dist/main'),
    lib: {
      entry: './src/main/index.ts',
      formats: ['cjs'],
      fileName: () => 'index.cjs',
    },
    rollupOptions: {
      external: [  ...builtinModules,          
        ...builtinModules.map(m => `node:${m}`),
      ]
    }
  }
})

