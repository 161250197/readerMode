<template>
  <div
    class="error-div"
    @click.stop="retryCallback"
  >
    <img
      class="day-mode-item"
      src="./../../assets/error.png"
      alt="day mode error icon"
    />
    <img
      class="night-mode-item"
      src="./../../assets/error-night.png"
      alt="night mode error icon"
    />
    <div class="prompt">
      {{ prompt }}
    </div>
    <div class="retry-prompt">
      {{ retryPrompt }}
    </div>
  </div>
</template>

<script>
import { defaultErrorPrompt } from './../../utils/consts.js'

export default {
  name: 'ErrorDiv',
  props: {
    prompt: {
      type: String,
      default: defaultErrorPrompt
    },
    retryCallback: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      retryPrompt: '点击空白区域重试'
    }
  }
}
</script>

<style lang="less" scoped>
.error-div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
  }
  .prompt {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .retry-prompt {
    margin-top: 0.2rem;
    font-size: 0.5rem;
    font-weight: lighter;
  }
}
</style>
