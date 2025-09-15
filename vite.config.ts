import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// Use Node's crypto directly
import { createHash } from 'node:crypto'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // force Vue plugin to use Node crypto
      template: {
        compilerOptions: {},
        transformAssetUrls: {},
      },
      // monkey patch getCacheKey to avoid global.crypto
      // @ts-expect-error private API
      __vuePluginOptions: {
        getCacheKey: (src: string) => createHash('sha256').update(src).digest('hex'),
      },
    }),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
