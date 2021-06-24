<template>
  <n-config-provider class="all" :class="[`${themeName}-theme`]" :theme="theme">
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
      const { theme, themeName } = useTheme()
      return {
        theme,
        themeName
      }
    }
  })
</script>
<style lang="scss" scoped></style>
