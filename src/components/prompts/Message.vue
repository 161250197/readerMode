<template>
  <transition name="fade">
    <div
      v-if="show"
      class="message-wrapper"
    >
      <div class="message text-ellipsis">
        {{ message }}
      </div>
    </div>
  </transition>
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
        this.show = true
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.closePromptMessage, this.duration)
      }
    }
  },
  data () {
    return {
      message: '',
      show: false,
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
      this.show = false
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
