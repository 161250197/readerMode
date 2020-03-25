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
    <div
      v-if="volumeKeySupport"
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
          src="./../../assets/switch-on.png"
          alt="day mode switch-on icon"
        />
        <img
          class="night-mode-item active-item"
          src="./../../assets/switch-on-night.png"
          alt="night mode switch-on icon"
        />
        <img
          class="day-mode-item inactive-item"
          src="./../../assets/switch-off.png"
          alt="day mode switch-off icon"
        />
        <img
          class="night-mode-item inactive-item"
          src="./../../assets/switch-off-night.png"
          alt="night mode switch-off icon"
        />
      </div>
    </div>
    <div
      class="item row-height"
      @click.stop="openRowHeightPrompt"
    >
      <div class="title">
        行间距设置
      </div>
      <div class="content">
        {{ rowSpacePrompt }}
        <img
          class="day-mode-item"
          src="./../../assets/arrow-right.png"
          alt="day mode arrow-right icon"
        />
        <img
          class="night-mode-item"
          src="./../../assets/arrow-right-night.png"
          alt="night mode arrow-right icon"
        />
      </div>
    </div>
    <RowHeightPrompt v-show="rowHeightPromptShow" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RowHeightPrompt from './components/RowHeightPrompt'

export default {
  name: 'MoreSetting',
  components: {
    RowHeightPrompt
  },
  computed: {
    ...mapState({
      rowHeightPromptShow: state => state.showState.rowHeightPromptShow,
      rowSpacePrompt: state => state.userConfig.rowSpacePrompt,
      volumeKeyOn: state => state.userConfig.volumeKeyOn,
      volumeKeySupport: state => state.deviceData.volumeKeySupport
    })
  },
  methods: {
    ...mapMutations([
      'setRowHeightPromptShow',
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
     * 打开行高选项弹窗
     */
    openRowHeightPrompt () {
      this.setRowHeightPromptShow(true)
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
@import url('./../../style/variables.less');

.more-setting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: @secondBackground;
  .header {
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    .back {
      position: fixed;
      top: 0.2rem;
      left: 0.2rem;
      > img {
        width: 1rem;
      }
    }
  }
  .item {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4rem;
    border-top: thin solid @borderColor;
    .title {
      font-size: 0.6rem;
    }
    &.volume-key-on {
      .content {
        height: 1.3rem;
        img {
          width: 1.3rem;
        }
      }
    }
    &.row-height {
      .content {
        display: flex;
        align-items: center;
        font-size: 0.5rem;
        img {
          width: 0.6rem;
        }
      }
    }
  }
}
.night-mode {
  .more-setting {
    background: @backgroundNight;
    .item {
      border-top-color: @borderColorNight;
    }
  }
}
</style>
