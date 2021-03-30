import { BrowserWindow } from 'electron'

interface Wins {
  mainWin: BrowserWindow | null
  previewPicWins: any
  [propName: string]: any
}

export const wins: Wins = {
  mainWin: null,
  previewPicWins: {}
}
