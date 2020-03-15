<template>
  <div
    class="error-wrapper"
    :style="{ 'background-color': backgroundColor }"
  >
    <ErrorDiv :retryCallback="initStore" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ErrorDiv from './../utils/ErrorDiv'

export default {
  name: 'Error',
  components: {
    ErrorDiv
  },
  computed: {
    ...mapState({
      backgroundColor: state => state.userConfig.backgroundColor
    })
  },
  methods: {
    ...mapActions([
      'initStore'
    ])
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
