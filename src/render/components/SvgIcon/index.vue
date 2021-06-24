<template>
  <svg class="app-svg-icon" :class="$attrs.class" aria-hidden="true" :style="styleComp">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType, CSSProperties } from 'vue'
  export default defineComponent({
    name: 'SvgIcon',
    inheritAttrs: false,
    props: {
      prefix: {
        type: String,
        default: 'icon'
      },
      name: {
        type: String,
        required: true
      },
      style: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
      },
      size: {
        type: String,
        default: '1em'
      }
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)
      const styleComp = computed(() => {
        const sizeStyle: CSSProperties = {
          width: props.size,
          height: props.size
        }
        return { ...sizeStyle, ...props.style }
      })

      return { symbolId, styleComp }
    }
  })
</script>

<style lang="scss" scoped>
  .app-svg-icon {
    display: inline-block;
    fill: currentColor;
  }
</style>
