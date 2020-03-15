<template>
  <div
    class="loading-wrapper"
    :style="{ 'background-color': backgroundColor }"
  >
    <LoadingDiv />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingDiv from './../utils/LoadingDiv'

export default {
  name: 'Loading',
  components: {
    LoadingDiv
  },
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
