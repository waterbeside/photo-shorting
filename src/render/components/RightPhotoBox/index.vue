<template>
  <section ref="picWrapper" class="preview-pic-wrapper">
    <img
      v-if="photo && typeof photo.src === 'string'"
      ref="pic"
      class="preview-pic"
      :src="photo.src"
      :style="{ transform: `rotate(${rotate}deg)` }"
      @click="handleClickPreview"
    />
  </section>
  {{ rotate }}
</template>
<script lang="ts">
  import { defineComponent, PropType, watch, onMounted, ref, nextTick } from 'vue'
  const ipcRenderer: any = typeof require === 'function' ? require('electron').ipcRenderer : null

  export interface PhotoItem {
    uid: string
    name?: string
    file?: any
    src?: string | null | ArrayBuffer
  }

  export default defineComponent({
    props: {
      photo: {
        type: Object as PropType<PhotoItem>,
        default: () => null
      },
      rotate: {
        type: Number,
        default: 0
      }
    },
    emits: ['click'],
    setup(props, ctx) {
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
              console.log('h', picWrapperDom.offsetHeight)
              console.log('w', picWrapperDom.offsetWidth)
              console.log('h', picDom.offsetHeight)
              console.log('w', picDom.offsetWidth)
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
        pic,
        picWrapper
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
    overflow: hidden;
  }
  .preview-pic {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
    transition: all 0.2s linear;
  }
</style>
