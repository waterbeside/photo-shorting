<template>
  <n-button circle :color="btnColor" size="tiny" @click="handleClickBtn">
    <template #icon>
      <n-icon v-if="themeName === 'dark'"><weather-moon24-filled /></n-icon>
      <n-icon v-else><weather-sunny24-filled /></n-icon>
    </template>
  </n-button>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import useTheme from '../../compositions/useTheme'
  import { NButton, NIcon } from 'naive-ui'
  import { WeatherSunny24Filled, WeatherMoon24Filled } from '@vicons/fluent'

  export default defineComponent({
    name: 'ThemeButton',
    components: {
      NIcon,
      NButton,
      WeatherSunny24Filled,
      WeatherMoon24Filled
    },
    setup() {
      const store = useStore()
      const { themeName } = useTheme()
      const btnColor = computed(() => {
        return themeName.value === 'dark' ? '#aaa' : '#444'
      })
      const handleClickBtn = () => {
        store.commit('TOGGLE_THEME')
      }
      return {
        themeName,
        btnColor,
        handleClickBtn
      }
    }
  })
</script>
