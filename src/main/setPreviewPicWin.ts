import { join } from 'path'
import { wins } from './wins'
import { ipcMain, BrowserWindow } from 'electron'
import is_dev from 'electron-is-dev'

export function setPreviewPicWin() {
  ipcMain.on('open-preview', async (e, args) => {
    const uid = args.uid || null
    if (!uid) {
      return false
    }
    if (wins.previewPicWins[uid]) {
      wins.previewPicWins[uid].show()
    } else {
      createPreviewWin(uid, wins.mainWin)
    }
  })
}

export function createPreviewWin(uid: string, mainWindow: BrowserWindow | null) {
  let URL = is_dev
    ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
    : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

  URL += `#/preview/${uid}`

  // 使用hash对子页面跳转，这是vue的路由思想
  wins.previewPicWins[uid] = new BrowserWindow({
    show: false,
    width: 600,
    height: 400,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    parent: mainWindow || undefined // mainWindow是主窗口
  })
  // wins.previewPicWins[uid] = miniWindow
  wins.previewPicWins[uid].webContents.openDevTools()
  wins.previewPicWins[uid].loadURL(URL)
  wins.previewPicWins[uid].show()

  wins.previewPicWins[uid].on('closed', () => {
    delete wins.previewPicWins[uid]
  })
}
