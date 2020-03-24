<template>
  <div
    class="setting"
    @click.stop
  >
    <FontSize />
    <Background />
    <ReaderMode />
    <div
      class="more-setting"
      @click.stop="openMoreSetting"
    >
      更多设置
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FontSize from './components/FontSize'
import Background from './components/Background'
import ReaderMode from './components/ReaderMode'

export default {
  name: 'UserMenu.Setting',
  components: {
    FontSize,
    Background,
    ReaderMode
  },
  methods: {
    ...mapMutations([
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
@import url('./../../../../style/variables.less');

.setting {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 0.5rem;
  line-height: 100%;
  background: @secondBackground;
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
    .more-setting {
      border-top-color: @borderColorNight;
    }
  }
}
</style>
