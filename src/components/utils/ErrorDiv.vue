<template>
  <div
    class="error-div-wrapper"
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
    <div class="prompt-wrapper">
      {{prompt}}
    </div>
    <div class="retry-prompt-wrapper">
      {{retryPrompt}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorDiv',
  props: {
    prompt: {
      type: String,
      default: '对不起 出错了'
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
.error-div-wrapper {
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
  .prompt-wrapper {
    margin: 0.5rem 0;
    text-align: center;
  }
  .retry-prompt-wrapper {
    font-size: 0.5rem;
    font-weight: lighter;
  }
}
</style>
