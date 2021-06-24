<template>
  <section class="photos-container" :class="`${themeName}-theme`">
    <n-upload
      :multiple="true"
      accept="image"
      class="upload-box"
      :class="{ 'have-data': photoList.length > 0 }"
      :style="{ '--border-radius': 0 }"
      @change="uploadChange"
    >
      <n-upload-dragger class="upload-box__inner">
        <div class="upload-tips">
          <n-icon v-if="photoList.length === 0" size="48" :depth="3">
            <image-add24-regular />
          </n-icon>
          <p class="upload-text"> 点击上传或拖动图片到这里 </p>
        </div>
        <ul v-if="photoList.length > 0" class="photo-list">
          <template v-for="item in photoList" :key="item.uid">
            <photo-item
              :photo="item"
              :selected="photoSelected !== null && item.uid === photoSelected.uid"
              @click-photo="handleClickPicture"
              @del-photo="handleDelPicture"
            />
          </template>
        </ul>
      </n-upload-dragger>
    </n-upload>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import { isImageType } from '../../../utils'
  import PhotoItem from './PhotoItem.vue'
  import { NUpload, NUploadDragger, NIcon } from 'naive-ui'
  import useTheme from '../../compositions/useTheme'
  import { ImageAdd24Regular } from '@vicons/fluent'

  export default defineComponent({
    name: 'PhotosContaioner',
    components: {
      PhotoItem,
      NUpload,
      NUploadDragger,
      NIcon,
      ImageAdd24Regular
    },
    emits: ['click-photo', 'del-photo'],
    setup(props, ctx) {
      // data
      const store = useStore()
      const { themeName } = useTheme()

      // computed
      const photoList = computed(() => {
        return store.state.photoList
      })
      const photoSelected = computed(() => {
        return store.state.photoSelected
      })

      // methods
      /**
       * 提交图片
       */
      const uploadChange = (options: any) => {
        let reader = new window.FileReader()
        const { file, fileList } = options
        if (!isImageType(file.file)) {
          return
        }
        reader.readAsDataURL(file.file)
        console.log('reader', reader)
        reader.onload = function () {
          console.log('reader.result', reader.result) //获取到base64格式图片
          const imageItemData: IPhotoItem = {
            src: reader.result,
            file: file.file,
            name: file.name,
            uid: file.id
          }
          store.dispatch('addPhotoItem', imageItemData)
        }
        console.log('beforeUpload file', file)
        console.log('beforeUpload fileList', fileList)
        return
      }
      const transformFile = (file: any) => {
        console.log('transformFile file', file)
      }

      /**
       * 点击图片列表的某张图片时
       */
      const handleClickPicture = (photoItem: IPhotoItem) => {
        store.dispatch('selectPhotoItem', photoItem)
        ctx.emit('click-photo', photoItem)
        return false
      }
      /**
       * 点击删除单张图片
       */
      const handleDelPicture = (photoItem: IPhotoItem) => {
        store.dispatch('delPhotoItem', photoItem)
        ctx.emit('del-photo', photoItem, photoItem.uid)
        return false
      }

      // return
      return {
        uploadChange,
        transformFile,
        handleClickPicture,
        handleDelPicture,
        themeName,
        photoList,
        photoSelected
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import '../../assets/style/_var.scss';
  .photos-container {
    flex-direction: column;

    .upload-box {
      // display: block;
      display: flex;
      flex-grow: 1;
      width: 100%;

      #{&}__inner {
        flex-grow: 1;
      }

      :deep(.n-upload__trigger) {
        display: flex;
        width: 100%;
        flex-grow: 1;
        height: 100%;
      }
      :deep(.n-upload-file-list) {
        display: none;
      }

      &.have-data {
        justify-content: flex-start;
        :deep(.ant-upload-drag-container) {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .upload-tips {
      text-align: center;
    }
    .photo-list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &.dark-theme {
      background-color: #333;
      color: #dce0e2;
    }
  }
</style>
