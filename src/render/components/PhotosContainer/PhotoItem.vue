<template>
  <li
    v-if="typeof photo.src === 'string'"
    class="photo-item"
    :class="[{ selected: selected }, `${themeName}-theme`]"
    @click.stop="handleClickPicture"
  >
    <span class="close-btn" @click.stop="handleDelPicture">
      <svg-icon class="icon" name="close" />
      <n-icon>
        <block20-filled />
      </n-icon>
    </span>
    <img :src="photo.src" class="photo" />
  </li>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import useTheme from '../../compositions/useTheme'
  import SvgIcon from '../SvgIcon/index.vue'

  export default defineComponent({
    name: 'PhotoItem',
    components: {
      SvgIcon
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
      const { themeName } = useTheme()
      const handleClickPicture = () => {
        ctx.emit('click-photo', props.photo)
      }
      const handleDelPicture = () => {
        ctx.emit('del-photo', props.photo.uid)
      }

      return {
        handleClickPicture,
        handleDelPicture,
        themeName
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
      display: None;
      position: absolute;
      font-size: 14px;
      right: -6px;
      top: -8px;
      border-radius: 50%;
      background: #444;
      width: 20px;
      height: 20px;
      color: #ddd;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    &.selected {
      background-image: repeating-linear-gradient(45deg, #eee 0, #eee 1px, #ddd 0, #ddd 5px);
      border-color: #888;
    }
    &:hover {
      border-color: $primary-color;
      .close-btn {
        display: inline-flex;
      }
    }
    &.dark-theme {
      background: #333;
      border-color: #303030;
      &.selected {
        background-image: repeating-linear-gradient(45deg, #444 0, #222 1px, #222 0, #222 5px);
        border-color: #333;
      }
      .close-btn {
        background: #ccc;
        color: #333;
      }
    }
  }
  .photo {
    width: 120px;
    height: 120px;
    object-fit: scale-down;
  }
</style>
