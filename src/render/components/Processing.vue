<template>
  <div class="c-processing" :class="{ running: percent < 100 }">
    <div class="progress-wrapper">
      <div class="dot-wrapper">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="collection"></div>
      </div>
      <n-progress
        type="circle"
        :percentage="percent"
        class="progress"
        :width="120"
        :indicator-placement="'inside'"
        processing
        color="#017dc9"
      />
    </div>
    <div class="text"> 正在处理 ({{ current + 1 }}/{{ len }}) </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { NProgress } from 'naive-ui'

  export default defineComponent({
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
        default: 1
      }
    },
    setup(props) {
      const percent = computed(() => {
        let percent = (props.current / props.len) * 100
        if (percent === 0) {
          percent = 5
        }
        return percent
      })
      // setup
      return {
        percent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @keyframes drop {
    0% {
      transform: scale(1) translateY(-700%);
      opacity: 0;
    }
    50% {
      transform: scale(0.6) translateY(-80%);
      opacity: 1;
    }
    100% {
      transform: scale(0.2) translateY(0px);
    }
  }
  .c-processing {
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
      border-radius: 50%;
      position: relative;
      margin-bottom: 20px;
    }
    .progress {
      position: relative;
      z-index: 10;
      background: #fff;
      border-radius: 100%;
    }
  }
  .dot-wrapper {
    $dotColor: hsl(194, 77%, 65%);
    // $dotColor: hsl(183, 90%, 45%);
    // $dotColor: hsl(183, 100%, 49%);
    // $dotColor: hsl(28, 100%, 50%);
    // $test: #017dc9;
    position: absolute;
    left: -20px;
    right: -20px;
    top: -200px;
    bottom: -10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    // filter: contrast(30) invert(100) hue-rotate(195deg);
    filter: contrast(30) invert(100) hue-rotate(180deg);
    background: #000;
    // border-radius: 100%;
    .dot {
      filter: blur(8px);
      width: 30px;
      height: 30px;
      background: $dotColor;
      bottom: 100px;
      position: absolute;
      opacity: 0;
    }
    .collection {
      border-radius: 100%;
      filter: blur(10px);

      background: $dotColor;
      position: absolute;
      width: 120px;
      height: 120px;
      bottom: 10px;
    }
  }
  .c-processing.running {
    .dot {
      animation: 3.5s drop linear infinite;
    }
    .dot:nth-child(2) {
      animation-delay: 0.7s;
    }
    .dot:nth-child(3) {
      animation-delay: 1.2s;
    }
  }
</style>
