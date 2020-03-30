<template>
  <div
    class="loading"
    :style="{ 'background-color': backgroundColor }"
  >
    <LoadingDiv :prompt="prompt" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingDiv from './../utils/LoadingDiv'
import { defaultLoadingPrompt } from './../../utils/consts.js'

export default {
  name: 'Prompts.Loading',
  props: {
    prompt: {
      type: String,
      default: defaultLoadingPrompt
    }
  },
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
.loading {
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
