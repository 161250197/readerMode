<template>
  <div
    class="bottom-user-menu"
    @click.stop
  >
    <div
      class="user-menu"
      @click.stop="onCatalogClicked"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/menu.png"
        alt="day mode menu icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/menu-night.png"
        alt="night mode menu icon"
      />
      目录
    </div>
    <div
      class="user-menu"
      @click.stop="onNightModeClicked"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/night-mode.png"
        alt="night mode icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/day-mode.png"
        alt="day mode icon"
      />
      {{ nightMode ? '日间模式' : '夜间模式' }}
    </div>
    <div
      class="user-menu"
      @click.stop="onSettingClicked"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/setting.png"
        alt="day mode setting icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/setting-night.png"
        alt="night mode setting icon"
      />
      设置
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'UserMenu.BottomUserMenu',
  computed: {
    ...mapState({
      nightMode: state => state.userConfig.nightMode
    })
  },
  methods: {
    ...mapMutations([
      'setNightMode',
      'setUserMenuShow',
      'setCatalogChaptersShow',
      'setSettingShow'
    ]),
    /**
     * 目录按钮点击响应
     */
    onCatalogClicked () {
      this.setCatalogChaptersShow(true)
      this.setUserMenuShow(false)
    },
    /**
     * 夜间模式按钮点击响应
     */
    onNightModeClicked () {
      this.setNightMode(!this.nightMode)
      this.setUserMenuShow(false)
    },
    /**
     * 设置按钮点击响应
     */
    onSettingClicked () {
      this.setSettingShow(true)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.bottom-user-menu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: @secondBackground;
  display: flex;
  .user-menu {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;
    > img {
      width: 1rem;
      margin-bottom: 0.25rem;
    }
  }
}
.night-mode {
  .bottom-user-menu {
    background: @secondBackgroundNight;
  }
}
</style>
