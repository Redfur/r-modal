import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: 'r-modal',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      }
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
})
