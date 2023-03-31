import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

import { OUTPUT_DIR } from './build/constant'
import { createVitePlugins } from './build/plugin'
import { createProxy, wrapperEnv } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const viteEnv: any = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  return {
    root,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/mixin.scss";'
        }
      }
    },
    base: VITE_PUBLIC_PATH || '/',
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@utils': resolve(__dirname, './src/utils')
      },
      extensions: ['.ts', '.vue', '.tsx', '.js', '.json']
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024 // chunk 大小警告的限制（单位kb）
    }
  }
})
