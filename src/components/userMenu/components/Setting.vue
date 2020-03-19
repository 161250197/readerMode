<template>
  <div
    class="setting"
    @click.stop
  >
    <div class="setting-item">
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
// import { readerModeUpDown, readerModeLeftRight } from './../../../utils/consts.js'

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
}
</style>
