<template>
  <div
    class="bottom-user-menu"
    @click.stop
  >
    <div
      class="user-menu-item"
      @click.stop="onCatalogClicked"
    >
      目录
    </div>
    <div
      class="user-menu-item"
      @click.stop="onNightModeClicked"
    >
      {{ nightMode ? '日间模式' : '夜间模式' }}
    </div>
    <div
      class="user-menu-item"
      @click.stop="onSettingClicked"
    >
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
      'setCatalogShow',
      'setSettingShow'
    ]),
    /**
     * 目录按钮点击响应
     */
    onCatalogClicked () {
      this.setCatalogShow(true)
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
.bottom-user-menu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: white;
  display: flex;
  .user-menu-item {
    height: 100%;
    flex: 1;
  }
}
</style>
