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
@import url('./../../../style/variables.less');

.device-info {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.5rem;
  .title {
    position: fixed;
    left: 0.65rem;
    max-width: 6rem;
  }
  .time {
    position: fixed;
    right: 1.95rem;
  }
  .battery {
    .battery-info-icon {
      background: @fontColor;
      transform-origin: left;
    }
    .battery-border-icon,
    .battery-info-icon {
      position: fixed;
      top: 0.3rem;
      right: 0.81rem;
      width: 0.9rem;
      height: 0.4rem;
      box-sizing: border-box;
      border: thin solid @fontColor;
    }
    .battery-right-icon {
      position: fixed;
      top: 0.35rem;
      right: 0.75rem;
      width: 0.04rem;
      height: 0.3rem;
      background: @fontColor;
    }
  }
}
.night-mode {
  .device-info {
    .battery {
      .battery-info-icon,
      .battery-right-icon {
        background: @fontColorNight;
      }
      .battery-info-icon {
        border-color: @fontColorNight;
      }
    }
  }
}
</style>
