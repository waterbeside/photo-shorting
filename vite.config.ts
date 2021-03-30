/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'

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
            if (/row/.test(name) || /col/.test(name)) {
              return 'ant-design-vue/es/grid/style/index.css'
            }
            return `ant-design-vue/es/${name}/style/index.css`
          }
        }
      ]
    }),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/render/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  optimizeDeps: {
    exclude: ['electron-is-dev', 'electron-store']
  }
})

export default config
