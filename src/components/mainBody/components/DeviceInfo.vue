<template>
  <div class="wrapper">
    <div class="title-wrapper text-ellipsis">
      {{readingChapterTitle}}{{readingChapterTitle}}{{readingChapterTitle}}{{readingChapterTitle}}
    </div>
    <div class="time-wrapper">
      {{timeStr}}
    </div>
    <div class="battery-wrapper">
      <div class="battery-border-icon"></div>
      <div
        class="battery-info-icon"
        :style="{ transform: `scaleX(${battery / 100})` }"
      >
      </div>
      <div class="battery-right-icon"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainBody.DeviceInfo',
  computed: {
    ...mapState({
      timeStr: state => state.deviceData.timeStr,
      battery: state => state.deviceData.battery,
      readingChapterTitle: state => state.mainBody.readingChapterTitle
    })
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 1rem;
  font-size: 0.6rem;
  line-height: 0.6rem;
  .title-wrapper {
    position: fixed;
    top: 0.2rem;
    left: 0.2rem;
    max-width: 6rem;
  }
  .time-wrapper {
    position: fixed;
    top: 0.2rem;
    right: 1.4rem;
  }
  .battery-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    .battery-info-icon {
      background: black;
      transform-origin: left;
    }
    .battery-border-icon,
    .battery-info-icon {
      position: fixed;
      top: 0.3rem;
      right: calc(0.1rem + 3px);
      width: 1rem;
      height: 0.4rem;
      box-sizing: border-box;
      border: thin solid black;
    }
    .battery-right-icon {
      position: fixed;
      top:0.35rem;
      right: 0.1rem;
      width: 2px;
      height: 0.3rem;
      background: black;
    }
  }
}
</style>
