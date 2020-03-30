<template>
  <div
    class="message-wrapper"
    :style="{ opacity }"
  >
    <div class="message text-ellipsis">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Prompts.Message',
  computed: {
    ...mapState({
      promptMessage: state => state.showState.promptMessage
    })
  },
  watch: {
    promptMessage () {
      if (this.promptMessage) {
        this.message = this.promptMessage
        this.setPromptMessage('')
        this.opacity = 1
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.closePromptMessage, this.duration)
      }
    }
  },
  data () {
    return {
      message: '',
      opacity: 0,
      timeoutId: undefined,
      duration: 2000
    }
  },
  methods: {
    ...mapMutations([
      'setPromptMessage'
    ]),
    /**
     * 关闭提示信息
     */
    closePromptMessage () {
      this.opacity = 0
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../style/variables.less');

.message-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  width: 100%;
  bottom: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;
  transition: opacity 0.5s;
  .message {
    text-align: center;
    font-size: 0.5rem;
    line-height: 0.55rem;
    box-sizing: border-box;
    padding: 0.2rem 0.4rem;
    border-radius: 0.5rem;
    color: @secondFontColor;
    background: @coverBackground;
  }
}
.night-mode {
  .message-wrapper {
    .message {
      color: @secondFontColorNight;
      background: @coverBackgroundNight;
    }
  }
}
</style>
