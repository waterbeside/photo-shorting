export const ipcRenderer = require('electron').ipcRenderer

export function isImageType(file: Blob) {
  const type = file.type
  if (type && type.indexOf('image/') === 0) {
    return true
  }
  return false
}
