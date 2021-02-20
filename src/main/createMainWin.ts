import { join } from 'path'

import { BrowserWindow } from 'electron'
import { wins } from './wins'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'
dotenv.config({ path: join(__dirname, '../../.env') })

export class createMainWin {
  // 创建浏览器窗口
  constructor() {
    wins.mainWin = new BrowserWindow({
      width: 1024,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

    if (is_dev) {
      wins.mainWin.webContents.openDevTools()
    }

    wins.mainWin.loadURL(URL)
  }
}
