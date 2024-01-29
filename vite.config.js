import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({ mode }) => {
  const config = {
    build: {
      outDir: resolve(__dirname, 'theme'),
      emptyOutDir: false,
      sourcemap: mode !== 'production',
      rollupOptions: {
        input: {
          riba: resolve(__dirname, 'src/ts/main.ts'),
        },
        output: {
          entryFileNames: `assets/[name].bundle.js`,
          chunkFileNames: `assets/[name]-[hash].bundle.js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    esbuild: {
      jsxFactory: 'jsxCreateElement',
      jsxFragment: 'jsxFragment',
    },
    plugins: [
      splitVendorChunkPlugin,
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
  }

  return config
})
