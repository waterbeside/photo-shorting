import { dialog, ipcMain } from 'electron'
import { wins } from '../windowManager/wins'
import { createPreviewWin } from '../windowManager/createPreviewWin'

export function setIpcs() {
  // 打开选择文件夹
  ipcMain.handle('open-directory-dialog', async (e: any, setting: any) => {
    const defaultSetting = { properties: ['openDirectory'] }
    const opt = Object.assign({}, defaultSetting, setting)
    const res = await dialog.showOpenDialog(opt)
    return res
  })

  // 点击图片预览时
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

  // 点击[处理当前]按钮时
  ipcMain.on('run-selected-ok', async (e, args) => {
    console.log('run-selected-ok args', args)
  })
}
