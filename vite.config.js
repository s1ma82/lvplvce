import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import alias from '@rollup/plugin-alias'
import ViteImagemin from 'vite-plugin-imagemin'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    brotliSize: true,

  },
  plugins: [
    react(),
    svgr(),
    alias(),
    ViteImagemin(),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@components': path.resolve(__dirname, './src/components'), 
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@futures': path.resolve(__dirname, './src/futures'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  },
  server: {
    port: 3000,
  }
})
