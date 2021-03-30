<template>
  <section class="photos-container">
    <a-upload-dragger
      name="file"
      :multiple="true"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      class="upload-box"
      :class="{ 'have-data': photoList.length > 0 }"
    >
      <div class="upload-tips">
        <p class="ant-upload-text"> 点击上传或拖动图片到这里 </p>
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
    </a-upload-dragger>
  </section>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, PropType } from 'vue'
  import { isImageType } from '../../../utils'
  import ipcStore from '../../../utils/ipcStroe'
  import { Upload } from 'ant-design-vue'
  import PhotoItem from './PhotoItem.vue'

  export default defineComponent({
    name: 'PhotosContaioner',
    components: {
      AUploadDragger: Upload.Dragger,
      PhotoItem
    },
    props: {
      photos: {
        type: Array as PropType<IPhotoItem[]>,
        default: () => []
      },
      selected: {
        type: Object as PropType<IPhotoItem>,
        default: () => {
          return null
        }
      }
    },
    emits: ['update:photos', 'update:selected', 'click-photo', 'del-photo'],
    setup(props, ctx) {
      // data
      let fileList = ref([])
      let photoList = ref<IPhotoItem[]>(props.photos)
      let photoSelected = ref<IPhotoItem | null>(props.selected)
      // watch
      watch(photoList, (val: any) => {
        ctx.emit('update:photos', val)
      })
      watch(photoSelected, (val: any) => {
        ctx.emit('update:selected', val)
      })
      // methods
      /**
       * 提交图片
       */
      const beforeUpload = (file: any, fileList: any[]) => {
        let reader = new window.FileReader()
        if (!isImageType(file)) {
          return false
        }
        reader.readAsDataURL(file)
        console.log('reader', reader)
        reader.onload = function () {
          console.log('reader.result', reader.result) //获取到base64格式图片
          const imageItemData: IPhotoItem = {
            src: reader.result,
            file,
            name: file.name,
            uid: file.uid
          }
          photoList.value.push(imageItemData)
          // fileSrc.value = reader.result;
          console.log('photoList', photoList)
          ipcSetPhotoListMap()
        }
        console.log('beforeUpload file', file)
        console.log('beforeUpload fileList', fileList)
        return false
      }
      const transformFile = (file: any) => {
        console.log('transformFile file', file)
      }
      const ipcSetPhotoListMap = () => {
        const photoMap: any = {}
        for (const item of photoList.value) {
          photoMap[item.uid] = {
            uid: item.uid,
            name: item.name,
            src: item.src
          }
        }
        console.log('ipcSetPhotoListMap', photoMap)
        ipcStore('photo-map').set(photoMap)
      }
      /**
       * 点击图片列表的某张图片时
       */
      const handleClickPicture = (photoItem: IPhotoItem) => {
        console.log('handleClickPicture', photoItem)
        photoSelected.value = photoItem
        ctx.emit('click-photo', photoItem)
        return false
      }
      /**
       * 点击删除单张图片
       */
      const handleDelPicture = (photoItemUid: string) => {
        const newPhotoList: IPhotoItem[] = []
        // const newFileList: PhotoItem[] = [];
        let delItem: IPhotoItem | null = null
        for (const item of photoList.value) {
          if (item.uid === photoItemUid) {
            delItem = item
            continue
          }
          newPhotoList.push(item)
        }
        photoList.value = newPhotoList
        ipcSetPhotoListMap()
        ctx.emit('del-photo', photoItemUid, delItem)
        console.log('handleDelPicture', photoItemUid)
        return false
      }

      // return
      return {
        beforeUpload,
        transformFile,
        handleClickPicture,
        handleDelPicture,
        fileList,
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
      background-color: #444;

      &.have-data {
        justify-content: flex-start;
        :deep(.ant-upload-drag-container) {
          display: flex;
          flex-direction: column;
        }
      }
      :deep(.ant-upload.ant-upload-drag) {
        background-color: #444;
        border-radius: 0;
        border-color: #555;
        border: none;
        height: auto;
      }
      :deep(p.ant-upload-text) {
        color: #bbb;
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
  }
</style>
