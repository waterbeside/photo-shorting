/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow } from 'electron'

import dotenv from 'dotenv'
import { setIpcStore } from './ipc/setIpcStore'
import { setIpcs } from './ipc'
import { createMainWin } from './windowManager/createMainWin'

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

// ********* ipcMain
setIpcs()
setIpcStore()
