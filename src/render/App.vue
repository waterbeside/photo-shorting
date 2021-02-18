<template>
  <!-- <MenuBar /> -->
  <div class="all">
    <div class="photos-container">
      <a-upload-dragger
        v-model:fileList="fileList"
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
          <template v-for="item in photoList">
            <li
              v-if="typeof item.src === 'string'"
              :key="item.uid"
              class="photo-item"
              :class="{ selected: photoSelected && item.uid === photoSelected.uid }"
              @click.stop="handleClickPicture(item)"
            >
              <span class="close-btn" @click.stop="handleDelPicture(item.uid)">
                <CloseCircleFilled />
              </span>
              <img :src="item.src" class="photo" />
            </li>
          </template>
        </ul>
      </a-upload-dragger>
    </div>
    <div class="tools-container">
      <img v-if="photoSelected && typeof photoSelected.src === 'string'" :src="photoSelected.src" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { isImageType } from '../utils';
  import { CloseCircleFilled } from '@ant-design/icons-vue';

  interface PhotoItem {
    uid: string;
    name?: string;
    file?: any;
    src?: string | null | ArrayBuffer;
  }

  export default defineComponent({
    name: 'App',
    components: {
      CloseCircleFilled
    },
    setup() {
      // data
      let fileList = ref([]);
      let photoList = ref<PhotoItem[]>([]);
      let photoSelected = ref<PhotoItem | null>(null);
      // watch
      watch(fileList, (val: any, oVal: any) => {
        console.log('fileList oVal', oVal);
        console.log('fileList val', val);
      });
      // methods
      const beforeUpload = (file: any, fileList: any[]) => {
        let reader = new window.FileReader();
        if (!isImageType(file)) {
          return false;
        }
        reader.readAsDataURL(file);
        console.log('reader', reader);
        reader.onload = function () {
          console.log('reader.result', reader.result); //获取到base64格式图片
          const imageItemData: PhotoItem = {
            src: reader.result,
            file,
            name: file.name,
            uid: file.uid
          };
          photoList.value.push(imageItemData);
          // fileSrc.value = reader.result;
          console.log('photoList', photoList);
        };
        console.log('beforeUpload file', file);
        console.log('beforeUpload fileList', fileList);
        return false;
      };
      const transformFile = (file: any) => {
        console.log('transformFile file', file);
      };
      /**
       * 点击图片列表的某张图片时
       */
      const handleClickPicture = (photoItem: PhotoItem) => {
        console.log('handleClickPicture', photoItem);
        photoSelected.value = photoItem;
        return false;
      };
      /**
       * 点击删除单张图片
       */
      const handleDelPicture = (photoItemUid: string) => {
        const newPhotoList: PhotoItem[] = [];
        // const newFileList: PhotoItem[] = [];
        for (const item of photoList.value) {
          if (item.uid === photoItemUid) {
            continue;
          }
          newPhotoList.push(item);
        }
        // for (const item of fileList.value) {
        //   if (item.uid === photoItemUid) {
        //     continue;
        //   }
        //   newPhotoList.push(item);
        // }
        photoList.value = newPhotoList;
        console.log('handleDelPicture', photoItemUid);
        return false;
      };

      // return
      return {
        beforeUpload,
        transformFile,
        handleClickPicture,
        handleDelPicture,
        fileList,
        photoList,
        photoSelected
      };
    }
  });
</script>
<style lang="scss" scoped>
  @import './assets/style/_var.scss';
  .photos-container {
    .upload-box {
      display: flex;
      height: 100%;
      &.have-data {
        justify-content: flex-start;
        :deep(.ant-upload-drag-container) {
          display: flex;
          flex-direction: column;
        }
      }
      :deep(.ant-upload.ant-upload-drag) {
        background-color: #eee;
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
      .photo-item {
        display: inline-block;
        width: 122px;
        border: 1px solid #fff;
        border-radius: 10px;
        margin: 10px;
        background: #fff;
        box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1), -10px -10px 25px rgba(255, 255, 255, 0.9);
        position: relative;
        .close-btn {
          display: none;
          position: absolute;
          font-size: 18px;
          right: -6px;
          top: -8px;
        }
        &.selected {
          background-image: repeating-linear-gradient(45deg, #eee 0, #888 1px, #ddd 0, #ddd 5px);
          border-color: #888;
        }
        &:hover {
          border-color: $primary-color;
          .close-btn {
            display: inline-block;
          }
        }
      }
      .photo {
        width: 120px;
        height: 120px;
        object-fit: scale-down;
      }
    }
  }
</style>
