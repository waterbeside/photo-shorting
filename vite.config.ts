/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from 'path';
import { UserConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';

dotenv.config({ path: join(__dirname, '.env') });
const root = join(__dirname, 'src/render');

const config: UserConfig = {
  root,
  alias: {
    '/@': root
  },
  base: './',
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
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['electron-is-dev', 'electron-store']
  }
};

export default config;
