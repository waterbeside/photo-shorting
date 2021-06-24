<template>
  <div class="preview-pic">
    test {{ uid }}
    <img :src="src" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import ipcStore from '../../utils/ipcStore'

  export default defineComponent({
    setup() {
      const uid = ref<any>(null)
      const src = ref<any>(null)
      const route = useRoute()
      uid.value = route.params.uid
      console.log(route.params)
      console.log(uid.value)
      ipcStore('data:photoMap')
        .get()
        .then((photoMap: any) => {
          src.value = photoMap[uid.value]?.src || null
        })
        .catch((err: any) => {
          console.log(err)
        })
      return {
        uid,
        src
      }
    }
  })
</script>

<style lang="scss" scoped></style>
