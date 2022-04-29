/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@bryce-loskie/scrollbar': resolve('./packages/core/src/index.ts'),
    },
  },
})
