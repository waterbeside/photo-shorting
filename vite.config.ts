/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'

dotenv.config({ path: join(__dirname, '.env') })
const root = join(__dirname, 'src/render')

const config = defineConfig({
  root,
  base: './',
  publicDir: '../../public',
  build: {
    outDir: join(__dirname, 'dist/render'),
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'crypto',
        'assert',
        'fs',
        'util',
        'os',
        'events',
        'child_process',
        'http',
        'https',
        'path',
        'electron'
      ]
    }
  },
  server: {
    port: +process.env.PORT
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'ant-design-vue',
          libDirectory: 'es',
          style(name: string) {
            if (/popconfirm/.test(name)) {
              return 'ant-design-vue/es/popover/style/index.css'
            }
            return `ant-design-vue/es/${name}/style/index.css`
          }
        }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['electron-is-dev', 'electron-store']
  }
})

export default config
