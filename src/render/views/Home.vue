<template>
  <PhotosContainer
    v-model:photos="photoList"
    v-model:selected="photoSelected"
    class="photos-container"
    @click-photo="handleClickPhoto"
  />
  <section class="tools-container">
    <RightPhotoBox :photo="photoSelected" :rotate="formState.rotate" />
    <OptionsPanel v-model:data="formState" />
  </section>
  <Processing v-if="isProcess" />
</template>

<script lang="ts">
  import { defineComponent, ref, UnwrapRef, reactive } from 'vue'
  import PhotosContainer from '../components/PhotosContainer/index.vue'
  import Processing from '../components/Processing.vue'
  import OptionsPanel, { OptionsDataType } from '../components/OptionsPanel/index.vue'
  import RightPhotoBox from '../components/RightPhotoBox/index.vue'

  const ipcRenderer: any = typeof require === 'function' ? require('electron').ipcRenderer : null

  export default defineComponent({
    name: 'Home',
    components: {
      PhotosContainer,
      OptionsPanel,
      RightPhotoBox,
      Processing
    },
    setup() {
      // data
      let fileList = reactive([])
      let photoList = reactive<IPhotoItem[]>([])
      let photoSelected = ref<IPhotoItem>()
      let isProcess = ref<Boolean>(true)
      const formState: UnwrapRef<OptionsDataType> = reactive({
        rotate: 0,
        dirPath: '',
        dpi: 72,
        isChangeSize: false,
        isFixWh: false,
        width: undefined,
        height: undefined,
        autoWidth: false,
        autoHeight: true
      })
      // methods
      const transformFile = (file: any) => {
        console.log('transformFile file', file)
      }
      /**
       * 点击图片列表的某张图片时
       */
      const handleClickPhoto = (photoItem: IPhotoItem) => {
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
        photoSelected,
        formState,
        isProcess
      }
    }
  })
</script>
<style lang="scss" scoped></style>
