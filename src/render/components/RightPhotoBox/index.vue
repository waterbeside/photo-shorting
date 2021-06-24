<template>
  <section ref="picWrapper" class="right-photo-box" :class="[`${themeName}-theme`]">
    <img
      v-if="photo && typeof photo.src === 'string'"
      ref="pic"
      class="preview-pic"
      :src="photo.src"
      :style="{ transform: `rotate(${rotate}deg)` }"
      @click="handleClickPreview"
    />
  </section>
</template>
<script lang="ts">
  import { defineComponent, PropType, watch, onMounted, ref, nextTick } from 'vue'
  import { ipcRenderer } from '../../../utils'
  import useTheme from '../../compositions/useTheme'

  export default defineComponent({
    props: {
      photo: {
        type: Object as PropType<IPhotoItem>,
        default: () => null
      },
      rotate: {
        type: Number,
        default: 0
      }
    },
    emits: ['click'],
    setup(props, ctx) {
      const { themeName } = useTheme()
      const pic = ref<HTMLElement>()
      const picWrapper = ref<HTMLElement>()
      const handleClickPreview = () => {
        if (ipcRenderer) {
          const uid = props.photo?.uid
          console.log('on click preview')
          ipcRenderer.send('open-preview', { uid })
          ctx.emit('click', props.photo)
        }
      }

      const fitPicSize = () => {
        nextTick().then(() => {
          const picWrapperDom = picWrapper.value
          const picDom = pic.value
          if (picDom && picWrapperDom) {
            if (![0, 180].includes(props.rotate)) {
              // 如果不是0度和180度则进行宽高计算处理
              if (picDom.offsetWidth > picWrapperDom.offsetHeight) {
                // 当图片宽度大于外高度时
                picDom.style.width = picWrapperDom.offsetHeight + 'px'
              } else if (picDom.offsetHeight > picWrapperDom.offsetWidth) {
                picDom.style.height = picWrapperDom.offsetWidth + 'px'
              }
            } else {
              picDom.style.width = 'auto'
              picDom.style.height = 'auto'
            }
          }
        })
      }

      watch(
        () => props.rotate,
        (newProps, oldProps) => {
          console.log('watch props', newProps)
          console.log('watch props', oldProps)
          nextTick().then(() => {
            fitPicSize()
          })
        }
      )

      onMounted(() => {
        console.log(picWrapper.value)
        // watchEffect(()=>{
        //   console.log(stateDom.value)
        // })
      })

      return {
        handleClickPreview,
        themeName,
        pic,
        picWrapper
      }
    }
  })
</script>

<style lang="scss" scoped>
  .right-photo-box {
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: #ddd;
    // box-shadow: inset 0 -10px 20px rgba(0,0,0,0.1);
    background-image: repeating-linear-gradient(45deg, #eee 0, #eee 1px, #ddd 0, #ddd 5px);
    overflow: hidden;
    &.dark-theme {
      background-image: repeating-linear-gradient(45deg, #444 0, #222 1px, #222 0, #222 5px);
    }
  }
  .preview-pic {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
    transition: all 0.2s linear;
  }
</style>
