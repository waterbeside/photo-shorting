<template>
  <div class="c-processing" :class="{ running: percent < 100 }">
    <div class="progress-wrapper">
      <div class="dot-wrapper">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="collection"></div>
      </div>
      <a-progress
        type="circle"
        :percent="percent"
        class="progress"
        :width="120"
        stroke-color="#096ae0"
      />
    </div>
    <div class="text"> 正在处理 ({{ current + 1 }}/{{ len }}) </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Progress } from 'ant-design-vue'

  export default defineComponent({
    components: {
      AProgress: Progress
    },
    props: {
      len: {
        type: Number,
        default: 1
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
    // $dotColor: #096ae0;
    $dotColor: hsl(183, 90%, 55%);
    // $dotColor: hsl(183, 100%, 49%);
    // $dotColor: hsl(28, 100%, 50%);
    position: absolute;
    left: -20px;
    right: -20px;
    top: -200px;
    bottom: -10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    filter: contrast(30) invert(100) hue-rotate(195deg);
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
