import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  base,
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/coze': {
        target: 'https://2qd6fybz9z.coze.site',
        changeOrigin: true,
        rewrite: () => '/stream_run',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('@coze/web-sdk')) {
              return 'coze-vendor';
            }
            if (id.includes('framer-motion') || id.includes('animejs')) {
              return 'animation-vendor';
            }
          }
        },
      },
    },
  },
})