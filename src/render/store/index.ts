import { createStore } from 'vuex'

interface stateType {
  photoSelected: IPhotoItem | null
  [propName: string]: any
}

function state(): stateType {
  return {
    photoSelected: null
  }
}

const mutations = {
  SET_PHOTO_SELECTED: (state: any, val: IPhotoItem | null) => {
    state.photoSelected = val
  }
}

// 创建 store 容器实例.
const store = createStore({
  state,
  mutations
})

export default store
