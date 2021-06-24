import { createStore, ActionContext } from 'vuex'
import ipcStore from '../../utils/ipcStore'

type ThemeType = 'light' | 'dark'
interface stateType {
  photoSelected: IPhotoItem | null
  photoList: IPhotoItem[]
  theme: ThemeType
  [propName: string]: any
}

function state(): stateType {
  return {
    photoSelected: null,
    photoList: [],
    theme: 'dark'
  }
}

const mutations = {
  SET_PHOTO_SELECTED: (state: stateType, val: IPhotoItem | null) => {
    state.photoSelected = val
  },
  SET_PHOTO_LIST: (state: stateType, list: IPhotoItem[]) => {
    state.photoList = list
  },
  TOGGLE_THEME: (state: stateType) => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  }
}

const actions = {
  toggleTheme: async (ctx: ActionContext<stateType, any>) => {
    ctx.commit('TOGGLE_THEME')
    const themeName = ctx.state.theme
    console.log('themeName', themeName)
    ipcStore('app:themeName').set(themeName)
    return themeName
  }
}

// 创建 store 容器实例.
const store = createStore({
  state,
  mutations,
  actions
})

export default store
