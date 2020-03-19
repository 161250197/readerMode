<template>
  <div
    class="user-menu"
    @click.stop="closeUserMenu"
  >
    <TopUserMenu v-show="!settingShow" />
    <BottomUserMenu v-show="!settingShow" />
    <Setting v-show="settingShow" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BottomUserMenu from './components/BottomUserMenu'
import TopUserMenu from './components/TopUserMenu'
import Setting from './components/Setting'

export default {
  name: 'userMenu',
  components: {
    BottomUserMenu,
    TopUserMenu,
    Setting
  },
  computed: {
    ...mapState({
      settingShow: state => state.showState.settingShow
    })
  },
  methods: {
    ...mapMutations([
      'setUserMenuShow'
    ]),
    /**
     * 关闭菜单项显示
     */
    closeUserMenu () {
      this.setUserMenuShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
.user-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
