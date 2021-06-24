<template>
  <div class="show-processing" :class="[{ running: percent < 100 }, `${themeName}-theme`]">
    <div class="progress-wrapper">
      <div v-if="status != 'success'" class="dot-wrapper">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="collection"></div>
      </div>
      <n-progress
        class="progress"
        type="line"
        :percentage="percent"
        :indicator-placement="'inside'"
        processing
        :status="status"
      />
    </div>
    <div class="text"> 正在处理 ({{ current + 1 }}/{{ len }}) </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { NProgress } from 'naive-ui'
  import useTheme from '../../compositions/useTheme'

  export default defineComponent({
    name: 'ShowProcessing',
    components: {
      NProgress
    },
    props: {
      len: {
        type: Number,
        default: 2
      },
      current: {
        type: Number,
        default: 0
      }
    },
    setup(props) {
      const { themeName } = useTheme()

      const percent = computed(() => {
        let percent = (props.current + 1 / props.len) * 100
        if (percent === 0) {
          percent = 5
        }
        return percent
      })
      const status = computed(() => {
        if (percent.value >= 100) {
          return 'success'
        }
        return 'default'
      })
      console.log('status', status)
      // setup
      return {
        themeName,
        percent,
        status
      }
    }
  })
</script>

<style lang="scss" scoped>
  @keyframes drop {
    0% {
      transform: scale(1) translateX(-800%);
      opacity: 0.7;
    }
    50% {
      transform: scale(0.6) translateX(-10%);
      opacity: 1;
    }
    100% {
      transform: scale(0.1) translateX(0px);
    }
  }
  .show-processing {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .progress-wrapper {
      width: 80%;
      position: relative;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }
    .dot-wrapper {
      $wrapperWidth: 100px;
      // $dotColor: hsl(190, 87%, 50%);
      $dotColor: #54aee6;
      position: relative;
      margin-right: -40px;
      padding-right: 10px;
      width: $wrapperWidth + 12px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-direction: row;
      // filter: contrast(20) invert(100) hue-rotate(195deg);
      filter: contrast(20) saturate(26%) hue-rotate(30deg);
      // filter: contrast(40) hue-rotate(20deg) saturate(50%);
      // background: #000;
      background: #fff;
      overflow: hidden;
      .dot {
        filter: blur(10px);
        width: 50px;
        height: 50px;
        background: $dotColor;
        position: absolute;
        opacity: 0;
        border-radius: 50%;
      }
      .collection {
        border-radius: 100%;
        filter: blur(10px);
        background: $dotColor;
        width: 40px;
        height: 40px;
      }
    }
    &.running {
      .dot {
        animation: 5s drop linear infinite;
      }
      .dot:nth-child(2) {
        animation-delay: 0.7s;
      }
      .dot:nth-child(3) {
        animation-delay: 1.2s;
      }
    }

    &.dark-theme {
      background: #222;
      color: #ccc;
      .dot-wrapper {
        overflow: hidden;
        $dotColor: hsl(190, 62%, 63%);
        background: none;
        filter: contrast(10);
        .dot,
        .collection {
          width: 10px;
          height: 10px;
          background: $dotColor;
        }
      }
    }
  }
</style>
