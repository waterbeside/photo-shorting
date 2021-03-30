<template>
  <li
    v-if="typeof photo.src === 'string'"
    class="photo-item"
    :class="{ selected: selected }"
    @click.stop="handleClickPicture"
  >
    <span class="close-btn" @click.stop="handleDelPicture">
      <CloseCircleFilled />
    </span>
    <img :src="photo.src" class="photo" />
  </li>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { CloseCircleFilled } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'PhotoItem',
    components: {
      CloseCircleFilled
    },
    props: {
      photo: {
        type: Object as PropType<IPhotoItem>,
        default: () => null
      },
      selected: {
        type: Boolean,
        default: false
      }
    },
    emits: ['click-photo', 'del-photo'],
    setup(props, ctx) {
      const handleClickPicture = () => {
        ctx.emit('click-photo', props.photo)
      }
      const handleDelPicture = () => {
        ctx.emit('del-photo', props.photo.uid)
      }

      return {
        handleClickPicture,
        handleDelPicture
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../assets/style/_var.scss';
  .photo-item {
    display: inline-block;
    width: 122px;
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 10px;
    background: #fff;
    box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2), -10px -10px 25px rgba(255, 255, 255, 0.1);
    position: relative;
    .close-btn {
      display: none;
      position: absolute;
      font-size: 18px;
      right: -6px;
      top: -8px;
    }
    &.selected {
      background-image: repeating-linear-gradient(45deg, #eee 0, #eee 1px, #ddd 0, #ddd 5px);
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
</style>
