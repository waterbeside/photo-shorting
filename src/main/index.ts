/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow, dialog, ipcMain } from 'electron'

import dotenv from 'dotenv'
import { setIpcStore } from './setIpcStore'
import { setPreviewPicWin } from './wins/setPreviewPicWin'
import { createMainWin } from './wins/createMainWin'

dotenv.config({ path: join(__dirname, '../../.env') })

// let mainWindow: BrowserWindow // 主窗口

app.whenReady().then(() => {
  new createMainWin()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createMainWin()
  }
})

// ********* ipcMain on
// 打开
ipcMain.handle('open-directory-dialog', async (e: any, setting: any) => {
  const defaultSetting = { properties: ['openDirectory'] }
  const opt = Object.assign({}, defaultSetting, setting)
  const res = await dialog.showOpenDialog(opt)
  return res
})

setIpcStore()
setPreviewPicWin()
