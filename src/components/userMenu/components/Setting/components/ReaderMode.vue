<template>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  readerModeUpDown,
  readerModeLeftRight
} from './../../../../../utils/consts.js'

export default {
  name: 'UserMenu.Setting.ReaderMode',
  computed: {
    ...mapState({
      readerMode: state => state.userConfig.readerMode
    })
  },
  data () {
    return {
      readerModeUpDown,
      readerModeLeftRight
    }
  },
  methods: {
    ...mapMutations([
      'setReaderMode'
    ]),
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
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../../../style/variables.less');
@import url('./../setting-item.less');

.reader-mode {
  justify-content: space-between;
  .content {
    justify-content: flex-end;
    .reader-mode-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      font-size: 0.5rem;
      line-height: 0.4rem;
      height: 0.8rem;
      padding: 0 0.4rem;
      border: 0.05rem solid @borderColor;
      border-radius: 0.4rem;
      font-weight: bold;
      &.select {
        border-color: @primaryColor;
        color: @primaryColor;
      }
      &:first-child {
        margin-right: 0.4rem;
      }
    }
  }
}
.night-mode {
  .reader-mode {
    .content {
      .reader-mode-item {
        border-color: @borderColorNight;
        &.select {
          border-color: @primaryColorNight;
          color: @primaryColorNight;
        }
      }
    }
  }
}
</style>
