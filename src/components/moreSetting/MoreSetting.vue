<template>
  <div class="more-setting">
    <div class="header">
      <div
        class="back"
        @click.stop="closeMoreSetting"
      >
        <img
          class="day-mode-item"
          src="./../../assets/back.png"
          alt="day mode back icon"
        />
        <img
          class="night-mode-item"
          src="./../../assets/back-night.png"
          alt="night mode back icon"
        />
      </div>
      更多设置
    </div>
    <VolumeKey v-if="volumeKeySupport" />
    <RowHeight />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VolumeKey from './components/VolumeKey'
import RowHeight from './components/RowHeight'

export default {
  name: 'MoreSetting',
  components: {
    VolumeKey,
    RowHeight
  },
  computed: {
    ...mapState({
      volumeKeySupport: state => state.deviceData.volumeKeySupport
    })
  },
  methods: {
    ...mapMutations([
      'setMoreSettingShow'
    ]),
    /**
     * 关闭更多设置页
     */
    closeMoreSetting () {
      this.setMoreSettingShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../style/variables.less');

.more-setting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: @secondBackground;
  .header {
    box-sizing: border-box;
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    border-bottom: thin solid @borderColor;
    .back {
      position: fixed;
      top: 0.2rem;
      left: 0.2rem;
      > img {
        width: 1rem;
      }
    }
  }
}
.night-mode {
  .more-setting {
    background: @backgroundNight;
    .header {
      border-bottom-color: @borderColorNight;
    }
  }
}
</style>
