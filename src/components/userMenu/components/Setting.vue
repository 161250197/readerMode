<template>
  <div
    class="setting"
    @click.stop
  >
    <div class="setting-item">
      <div class="setting-name">
        阅读模式
      </div>
      <div
        class="reader-mode-item"
        @click.stop="setReaderModeUpDown"
      >
        上下翻页
      </div>
      <div
        class="reader-mode-item"
        @click.stop="setReaderModeLeftRight"
      >
        左右翻页
      </div>
    </div>
    <div
      class="more-setting-button"
      @click="openMoreSetting"
    >
      更多设置
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { readerModeUpDown, readerModeLeftRight } from './../../../utils/consts.js'

export default {
  name: 'UserMenu.Setting',
  computed: {
    ...mapState({
      readerMode: state => state.userConfig.readerMode
    })
  },
  methods: {
    ...mapMutations([
      'setReaderMode',
      'setMoreSettingShow'
    ]),
    /**
     * 设置阅读模式为上下翻页
     */
    setReaderModeUpDown () {
      this.setReaderMode(readerModeUpDown)
    },
    /**
     * 设置阅读模式为左右翻页
     */
    setReaderModeLeftRight () {
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
.setting {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: white;
}
.night-mode {
  .setting {
    background: black;
  }
}
</style>
