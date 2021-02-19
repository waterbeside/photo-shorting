/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'
import Store from 'electron-store'

const store = new Store()
ipcMain.on('store:set', async (e, args) => {
  store.set(args.key, args.value)
})
ipcMain.handle('store:get', async (e, args) => {
  const value = await store.get(args)
  return value
})
ipcMain.on('store:delete', async (e, args) => {
  store.delete(args)
})

dotenv.config({ path: join(__dirname, '../../.env') })
console.log('is_dev', is_dev)
let win: BrowserWindow | null = null

class createWin {
  // 创建浏览器窗口
  constructor() {
    win = new BrowserWindow({
      width: 1024,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    console.log('http://localhost:${process.env.PORT}', `http://localhost:${process.env.PORT}`)
    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

    win?.loadURL(URL)
    if (is_dev) {
      win?.webContents.openDevTools({ mode: 'right' })
    }
  }
}

app.whenReady().then(() => new createWin())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin()
  }
})
