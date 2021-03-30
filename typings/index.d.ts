declare module 'electron-connect'
interface IPhotoItem {
  uid: string
  name?: string
  file?: any
  src?: string | null | ArrayBuffer
}
