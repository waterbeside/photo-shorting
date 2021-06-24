import { createStore } from 'vuex'

type ThemeType = 'light' | 'dark'
interface stateType {
  photoSelected: IPhotoItem | null
  theme: ThemeType
  [propName: string]: any
}

function state(): stateType {
  return {
    photoSelected: null,
    theme: 'dark'
  }
}

const mutations = {
  SET_PHOTO_SELECTED: (state: stateType, val: IPhotoItem | null) => {
    state.photoSelected = val
  },
  TOGGLE_THEME: (state: stateType) => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  }
}

// 创建 store 容器实例.
const store = createStore({
  state,
  mutations
})

export default store
