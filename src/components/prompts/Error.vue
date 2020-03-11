<template>
  <div
    class="error-wrapper"
    :style="{ 'background-color': backgroundColor }"
  >
    <div>
      Error...
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Error',
  computed: {
    ...mapState({
      backgroundColor: state => state.userConfig.backgroundColor
    })
  }
}
</script>

<style lang="less" scoped>
.error-wrapper {
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
