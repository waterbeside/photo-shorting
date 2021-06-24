import { computed } from 'vue'
import { useStore } from 'vuex'
import { darkTheme } from 'naive-ui'
export default function useTheme() {
  const store = useStore()
  const themeName = computed(() => {
    return store.state.theme
  })
  const theme = computed(() => {
    return themeName.value === 'dark' ? darkTheme : null
  })
  return {
    theme,
    themeName
  }
}
