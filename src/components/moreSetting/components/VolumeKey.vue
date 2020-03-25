<template>
  <div
    class="item volume-key-on"
    @click.stop="changeVolumeKeyOn"
  >
    <div class="title">
      音量键翻页
    </div>
    <div
      class="content"
      :class="{ 'active': volumeKeyOn }"
    >
      <img
        class="day-mode-item active-item"
        src="./../../../assets/switch-on.png"
        alt="day mode switch-on icon"
      />
      <img
        class="night-mode-item active-item"
        src="./../../../assets/switch-on-night.png"
        alt="night mode switch-on icon"
      />
      <img
        class="day-mode-item inactive-item"
        src="./../../../assets/switch-off.png"
        alt="day mode switch-off icon"
      />
      <img
        class="night-mode-item inactive-item"
        src="./../../../assets/switch-off-night.png"
        alt="night mode switch-off icon"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MoreSetting.VolumeKey',
  computed: {
    ...mapState({
      volumeKeyOn: state => state.userConfig.volumeKeyOn
    })
  },
  methods: {
    ...mapMutations([
      'setVolumeKeyOn'
    ]),
    /**
     * 更改音量键翻页功能开闭状态
     */
    changeVolumeKeyOn () {
      this.setVolumeKeyOn(!this.volumeKeyOn)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./more-setting-item.less');

.volume-key-on {
  .content {
    height: 1.3rem;
    img {
      width: 1.3rem;
    }
  }
}
</style>
