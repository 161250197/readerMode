<template>
  <div class="wrapper">
    <div class="title-wrapper">
      {{readingChapterTitle}}
    </div>
    <div class="right-info-wrapper">
      <div class="time-wrapper">
        {{timeStr}}
      </div>
      <div class="battery-wrapper">
        <!-- TODO 修改为绘制的电池图标 css -->
        电量：{{battery}}
      </div>
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6rem;
  .right-info-wrapper {
    display: flex;
  }
}
</style>
