import { ipcMain } from 'electron'

export function setRunPicIpc() {
  ipcMain.on('run-selected-ok', async (e, args) => {
    console.log('run-selected-ok args', args)
  })
}
