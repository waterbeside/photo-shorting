import { createStore, ActionContext } from 'vuex'
import ipcStore from '../../utils/ipcStore'

type ThemeType = 'light' | 'dark'
interface IState {
  photoSelected: IPhotoItem | null
  photoList: IPhotoItem[]
  theme: ThemeType
  [propName: string]: any
}

interface IPhotoMap {
  [propName: string]: IPhotoItem
}

function state(): IState {
  return {
    photoSelected: null,
    photoList: [],
    theme: 'dark'
  }
}

const mutations = {
  SET_PHOTO_SELECTED: (state: IState, photoItem: IPhotoItem | null) => {
    state.photoSelected = photoItem
  },
  SET_PHOTO_LIST: (state: IState, list: IPhotoItem[]) => {
    state.photoList = list
  },
  ADD_PHOTO_ITEM: (state: IState, photoItem: IPhotoItem) => {
    state.photoList.push(photoItem)
  },
  TOGGLE_THEME: (state: IState) => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  }
}

const actions = {
  /**
   * 切换主题（暗黑和正常模式）
   */
  toggleTheme: async (ctx: ActionContext<IState, any>) => {
    ctx.commit('TOGGLE_THEME')
    const themeName = ctx.state.theme
    console.log('themeName', themeName)
    ipcStore('app:themeName').set(themeName)
    return themeName
  },

  /**
   * 选择图片
   */
  selectPhotoItem: (ctx: ActionContext<IState, any>, photoItem: IPhotoItem) => {
    ctx.commit('SET_PHOTO_SELECTED', photoItem)
  },

  /**
   * 添加一张图片
   */
  addPhotoItem: (ctx: ActionContext<IState, any>, photoItem: IPhotoItem) => {
    ctx.commit('ADD_PHOTO_ITEM', photoItem)
    const photoList = ctx.state.photoList
    ipcStore('data:photoList').set(photoList)
    ipcSetPhotoListMap(photoList)
  },

  /**
   * 删除一张图片
   */
  delPhotoItem: (ctx: ActionContext<IState, any>, photoItem: IPhotoItem) => {
    const photoItemUid = photoItem.uid
    const newPhotoList: IPhotoItem[] = ctx.state.photoList.filter((item) => {
      return item.uid !== photoItemUid
    })
    ctx.commit('SET_PHOTO_LIST', newPhotoList)
    ipcStore('data:photoList').set(newPhotoList)
    ipcSetPhotoListMap(newPhotoList)

    if (photoItemUid === ctx.state.photoSelected?.uid) {
      ctx.commit('SET_PHOTO_SELECTED', null)
    }
  },

  /**
   * 清除图片列表
   */
  clearPhotoList: (ctx: ActionContext<IState, any>) => {
    ctx.commit('SET_PHOTO_LIST', [])
    ipcStore('data:photoList').set([])
    ipcSetPhotoListMap(null)
  }
}

function ipcSetPhotoListMap(photoList: IPhotoItem[] | null) {
  const photoMap: IPhotoMap = {}
  if (photoList) {
    for (const item of photoList) {
      photoMap[item.uid] = {
        uid: item.uid,
        name: item.name,
        src: item.src
      }
    }
  }
  ipcStore('data:photoMap').set(photoMap)
}

// 创建 store 容器实例.
const store = createStore({
  state,
  mutations,
  actions
})

export default store
