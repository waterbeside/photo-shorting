<template>
  <n-config-provider class="all" :theme="theme">
    <router-view />
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { NConfigProvider } from 'naive-ui'
  import useTheme from './compositions/useTheme'

  export default defineComponent({
    name: 'Home',
    components: {
      NConfigProvider
    },
    setup() {
      const { theme } = useTheme()
      return {
        theme
      }
    }
  })
</script>
<style lang="scss" scoped></style>
