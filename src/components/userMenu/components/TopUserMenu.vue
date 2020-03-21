<template>
  <div
    class="top-user-menu"
    @click.stop
  >
    TopUserMenu
  </div>
</template>

<script>

export default {
  name: 'UserMenu.TopUserMenu'
}
</script>

<style lang="less" scoped>
.top-user-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: white;
}
.night-mode {
  .top-user-menu {
    background: black;
  }
}
</style>
