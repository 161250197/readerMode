<template>
  <div class="change-source">
    ChangeSource
  </div>
</template>

<script>
export default {
  name: 'UserMenu.ChangeSource'
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.change-source {
  width: 100%;
  background: @secondBackground;
}
.night-mode {
  .change-source {
    background: @secondBackgroundNight;
  }
}
</style>
