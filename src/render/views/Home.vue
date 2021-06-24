<template>
  <theme-button class="theme-button"></theme-button>
  <photos-container class="photos-container" @click-photo="handleClickPhoto" />
  <section class="tools-container" :class="[`${themeName}-theme`]">
    <right-photo-box :rotate="formState.rotate" />
    <options-panel v-model:data="formState" />
  </section>
  <show-processing v-if="isProcess" />
</template>

<script lang="ts">
  import { defineComponent, ref, UnwrapRef, reactive } from 'vue'
  import PhotosContainer from '../components/PhotosContainer/index.vue'
  import ShowProcessing from '../components/ShowProcessing/index.vue'
  import ThemeButton from '../components/ThemeButton/index.vue'
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
      ShowProcessing,
      ThemeButton
    },
    setup() {
      // data
      const { themeName } = useTheme()
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
        formState,
        isProcess,
        // beforeUpload,
        transformFile,
        handleClickPhoto
        // handleDelPicture,
        // handleClickPreview
      }
    }
  })
</script>
<style lang="scss" scoped>
  .theme-button {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .tools-container {
    &.dark-theme {
      background: #333;
    }
  }
</style>
