<template>
  <div
    class="more-setting"
    @click.stop="closeMoreSetting"
  >
    moreSetting
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'moreSetting',
  methods: {
    ...mapMutations([
      'setMoreSettingShow'
    ]),
    /**
     * 关闭更多设置页
     */
    closeMoreSetting () {
      // TODO
      this.setMoreSettingShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
.more-setting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
}
</style>
