<template>
  <div
    class="setting"
    @click.stop
  >
    <div class="font-size item">
      <div class="title">
        字体大小
      </div>
      <div class="content">
        <div class="prompt">
          小
        </div>
        <div class="range">
          <div class="range-line">
            <div
              class="separate"
              v-for="(fontSize, index) in fontSizes"
              :key="index"
            >
            </div>
          </div>
          <div class="range-cursor"></div>
        </div>
        <div class="prompt">
          超大
        </div>
      </div>
    </div>
    <div class="background item">
      <div class="title">
        背景色
      </div>
      <div class="content">
        <div
          class="background-item"
          v-for="(background, index) in backgroundColors"
          :key="index"
          :class="{ 'select': backgroundColor === background }"
          :style="{ background: background }"
          @click.stop="() => setBackground(background)"
        >
        </div>
      </div>
    </div>
    <div class="reader-mode item">
      <div class="title">
        阅读模式
      </div>
      <div class="content">
        <div
          class="reader-mode-item"
          :class="{ 'select': readerMode === readerModeUpDown }"
          @click.stop="setReaderModeUpDown"
        >
          上下翻页
        </div>
        <div
          class="reader-mode-item"
          :class="{ 'select': readerMode === readerModeLeftRight }"
          @click.stop="setReaderModeLeftRight"
        >
          左右翻页
        </div>
      </div>
    </div>
    <div
      class="more-setting"
      @click.stop="openMoreSetting"
    >
      更多设置
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  fontSizes,
  backgroundColors,
  readerModeUpDown,
  readerModeLeftRight
} from './../../../utils/consts.js'

export default {
  name: 'UserMenu.Setting',
  computed: {
    ...mapState({
      nightMode: state => state.userConfig.nightMode,
      backgroundColor: state => state.userConfig.backgroundColor,
      readerMode: state => state.userConfig.readerMode
    })
  },
  data () {
    return {
      fontSizes,
      backgroundColors,
      readerModeUpDown,
      readerModeLeftRight
    }
  },
  methods: {
    ...mapMutations([
      'setNightMode',
      'setBackgroundColor',
      'setReaderMode',
      'setMoreSettingShow'
    ]),
    /**
     * 设置背景色
     * - 自动退出夜间模式
     */
    setBackground (background) {
      if (this.nightMode) {
        this.setNightMode(false)
      }
      if (this.backgroundColor === background) {
        return
      }
      this.setBackgroundColor(background)
    },
    /**
     * 设置阅读模式为上下翻页
     */
    setReaderModeUpDown () {
      if (this.readerMode === readerModeUpDown) {
        return
      }
      this.setReaderMode(readerModeUpDown)
    },
    /**
     * 设置阅读模式为左右翻页
     */
    setReaderModeLeftRight () {
      if (this.readerMode === readerModeLeftRight) {
        return
      }
      this.setReaderMode(readerModeLeftRight)
    },
    /**
     * 打开更多设置页
     */
    openMoreSetting () {
      this.setMoreSettingShow(true)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.setting {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 0.5rem;
  line-height: 100%;
  background: @secondBackground;
  .item {
    display: flex;
    align-items: center;
    height: 1.4rem;
    padding: 0 0.4rem;
    .content {
      width: 7rem;
      display: flex;
      align-items: center;
    }
  }
  .font-size {
    justify-content: space-between;
    .content {
      justify-content: space-between;
      position: fixed;
      right: 0.4rem;
      .prompt {
        font-size: 0.4rem;
        &:first-child {
          margin-right: 0.4rem;
        }
        &:last-child {
          margin-left: 0.4rem;
        }
      }
      .range {
        flex: 1;
        .range-line {
          background: @fontColor;
          height: 0.05rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .separate {
            background: @fontColor;
            height: 0.25rem;
            width: 0.05rem;
          }
        }
        .range-cursor {
          box-sizing: border-box;
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
          background: @secondBackground;
          border: 0.05rem solid @borderColor;
          position: fixed;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .background {
    justify-content: space-between;
    .content {
      justify-content: space-between;
      .background-item {
        box-sizing: border-box;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        &.select {
          border: thin solid @primaryColor;
        }
      }
    }
  }
  .reader-mode {
    justify-content: space-between;
    .content {
      justify-content: space-evenly;
      .reader-mode-item {
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.4rem;
        border: thin solid @borderColor;
        border-radius: 0.4rem;
        font-weight: bold;
        background: @secondBackground;
        &.select {
          background: @primaryColor;
          color: @secondFontColor;
        }
      }
    }
  }
  .more-setting {
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: thin solid @borderColor;
  }
}
.night-mode {
  .setting {
    background: @secondBackgroundNight;
    .font-size {
      .content {
        .range {
          .range-line,
          .separate {
            background: @fontColorNight;
          }
          .range-cursor {
            background: @secondBackgroundNight;
            border-color: @borderColorNight;
          }
        }
      }
    }
    .background {
      .content {
        .background-item {
          &.select {
            border-color: @borderColorNight;
          }
        }
      }
    }
    .reader-mode {
      .content {
        .reader-mode-item {
          border-color: @borderColorNight;
          background: @secondBackgroundNight;
          &.select {
            background: @primaryColorNight;
            color: @secondFontColorNight;
          }
        }
      }
    }
    .more-setting {
      border-top-color: @borderColorNight;
    }
  }
}
</style>
