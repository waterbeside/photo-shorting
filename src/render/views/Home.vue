<template>
  <PhotosContainer
    v-model:photos="photoList"
    v-model:selected="photoSelected"
    class="photos-container"
    @click-photo="handleClickPhoto"
  />
  <section class="tools-container" :class="[`${themeName}-theme`]">
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
  import { ipcRenderer } from '../../utils'
  import useTheme from '../compositions/useTheme'

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
      const { themeName } = useTheme()
      const fileList = reactive([])
      const photoList = reactive<IPhotoItem[]>([])
      const photoSelected = ref<IPhotoItem>()
      const isProcess = ref<Boolean>(false)
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

      ipcRenderer.on('change-process-status', (event: any, args: any) => {
        if (args.status) {
          isProcess.value = true
        } else {
          isProcess.value = false
        }
        console.log('渲染进程收到的数据:', args)
      })

      // return
      return {
        themeName,
        fileList,
        photoList,
        photoSelected,
        formState,
        isProcess,
        // beforeUpload,
        transformFile,
        handleClickPhoto,
        // handleDelPicture,
        handleClickPreview
      }
    }
  })
</script>
<style lang="scss" scoped>
  .tools-container {
    &.dark-theme {
      background: #333;
    }
  }
</style>
