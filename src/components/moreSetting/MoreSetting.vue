<template>
  <div
    class="more-setting"
    @click.stop="closeMoreSetting"
  >
    moreSetting
    <div
      v-if="volumeKeySupport"
      class="more-setting-item"
      @click.stop="changeVolumeKeyOn"
    >
      音量键翻页功能：{{ volumeKeyOn ? '开启中' : '已关闭' }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'moreSetting',
  computed: {
    ...mapState({
      volumeKeyOn: state => state.userConfig.volumeKeyOn,
      volumeKeySupport: state => state.deviceData.volumeKeySupport
    })
  },
  methods: {
    ...mapMutations([
      'setVolumeKeyOn',
      'setMoreSettingShow'
    ]),
    /**
     * 更改音量键翻页功能开闭状态
     */
    changeVolumeKeyOn () {
      this.setVolumeKeyOn(!this.volumeKeyOn)
    },
    /**
     * 关闭更多设置页
     */
    closeMoreSetting () {
      // TODO
      this.setMoreSettingShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
.more-setting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
}
.night-mode {
  .more-setting {
    background: black;
  }
}
</style>
