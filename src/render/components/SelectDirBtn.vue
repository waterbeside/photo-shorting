<template>
  <div class="select-dir-btn" @click="selectDir">
    <FolderOutlined v-if="isNoSlot" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, watch, computed } from 'vue'
  import { FolderOutlined } from '@ant-design/icons-vue'
  import { ipcRenderer } from '../../utils'

  export default defineComponent({
    name: 'SelectDirBtn',
    components: {
      FolderOutlined
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请选择文件夹 '
      }
    },
    emits: ['update:value', 'after-selected'],
    setup(props, ctx) {
      // data
      const dirValue = ref(props.value)
      // watch
      watch(dirValue, (val) => {
        ctx.emit('update:value', val)
      })
      // computed
      const isNoSlot = computed(() => {
        return ctx.slots.default ? false : true
      })
      // methods
      const selectDir = () => {
        if (!ipcRenderer) {
          return false
        }
        ipcRenderer.invoke('open-directory-dialog').then((res: any) => {
          if (!res.canceled) {
            dirValue.value = res.filePaths[0]
          }
          ctx.emit('after-selected', res)
        })
      }

      return {
        dirValue,
        isNoSlot,
        selectDir
      }
    }
  })
</script>

<style lang="scss" scoped>
  .select-dir-btn {
    display: inline-block;
    cursor: pointer;
    color: #888;
  }
</style>
