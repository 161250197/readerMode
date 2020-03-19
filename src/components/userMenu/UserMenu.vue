<template>
  <div
    class="user-menu-wrapper"
    @click.stop="closeUserMenu"
  >
    userMenu
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'userMenu',
  methods: {
    ...mapMutations([
      'setUserMenuShow'
    ]),
    closeUserMenu () {
      this.setUserMenuShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
.user-menu-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
