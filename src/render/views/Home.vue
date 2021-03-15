<template>
  <PhotosContainer
    v-model:photos="photoList"
    v-model:selected="photoSelected"
    class="photos-container"
    @click-photo="handleClickPhoto"
  />
  <div class="tools-container">
    <section class="preview-pic-wrapper">
      <img
        v-if="photoSelected && typeof photoSelected.src === 'string'"
        class="preview-pic"
        :src="photoSelected.src"
        @click="handleClickPreview"
      />
    </section>
    <OptionsPanel />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import PhotosContainer from '../components/PhotosContainer/index.vue'
  import OptionsPanel from '../components/OptionsPanel/index.vue'

  const ipcRenderer: any = typeof require === 'function' ? require('electron').ipcRenderer : null

  interface PhotoItem {
    uid: string
    name?: string
    file?: any
    src?: string | null | ArrayBuffer
  }

  export default defineComponent({
    name: 'Home',
    components: {
      PhotosContainer,
      OptionsPanel
    },
    setup() {
      // data
      let fileList = ref([])
      let photoList = ref<PhotoItem[]>([])
      let photoSelected = ref<PhotoItem>()
      // watch
      watch(fileList, (val: any, oVal: any) => {
        console.log('fileList oVal', oVal)
        console.log('fileList val', val)
      })
      // methods

      const transformFile = (file: any) => {
        console.log('transformFile file', file)
      }
      /**
       * 点击图片列表的某张图片时
       */
      const handleClickPhoto = (photoItem: PhotoItem) => {
        console.log('handleClickPicture', photoItem)
        return false
      }

      const handleClickPreview = () => {
        if (ipcRenderer) {
          const uid = photoSelected.value?.uid
          console.log('on click preview')
          ipcRenderer.send('open-preview', { uid })
        }
      }

      // return
      return {
        // beforeUpload,
        transformFile,
        handleClickPhoto,
        // handleDelPicture,
        handleClickPreview,
        fileList,
        photoList,
        photoSelected
      }
    }
  })
</script>
<style lang="scss" scoped>
  .preview-pic-wrapper {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: #ddd;
    // box-shadow: inset 0 -10px 20px rgba(0,0,0,0.1);
    background-image: repeating-linear-gradient(45deg, #eee 0, #eee 1px, #ddd 0, #ddd 5px);
  }
  .preview-pic {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
  }
</style>
