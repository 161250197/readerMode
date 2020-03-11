<template>
  <div
    class="loading-wrapper"
    :style="{ 'background-color': backgroundColor }"
  >
    <div>
      Loading...
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Loading',
  computed: {
    ...mapState({
      backgroundColor: state => state.userConfig.backgroundColor
    })
  }
}
</script>

<style lang="less" scoped>
.loading-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
