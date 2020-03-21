<template>
  <div class="device-info">
    <div class="title text-ellipsis">
      {{ readingChapterTitle }}
    </div>
    <div class="time">
      {{ timeStr }}
    </div>
    <div class="battery">
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
.device-info {
  width: 100%;
  height: 1rem;
  font-size: 0.6rem;
  line-height: 0.6rem;
  .title {
    position: fixed;
    top: 0.2rem;
    left: 0.2rem;
    max-width: 6rem;
  }
  .time {
    position: fixed;
    top: 0.2rem;
    right: 1.4rem;
  }
  .battery {
    position: fixed;
    top: 0;
    right: 0;
    .battery-info-icon {
      background: #333333;
      transform-origin: left;
    }
    .battery-border-icon,
    .battery-info-icon {
      position: fixed;
      top: 0.3rem;
      right: 0.16rem;
      width: 1rem;
      height: 0.4rem;
      box-sizing: border-box;
      border: thin solid #333333;
    }
    .battery-right-icon {
      position: fixed;
      top:0.35rem;
      right: 0.1rem;
      width: 0.04rem;
      height: 0.3rem;
      background: #333333;
    }
  }
}
.night-mode {
  .device-info {
    .battery {
      .battery-info-icon,
      .battery-right-icon {
        background: #666666;
      }
      .battery-info-icon {
        border-color: #666666;
      }
    }
  }
}
</style>
