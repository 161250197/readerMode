<template>
  <div
    class="row-height-prompt"
    @click.stop="closePrompt"
  >
    <div
      class="content"
      @click.stop
    >
      <div class="wrapper">
        <div
          class="prompt"
          :class="{ 'active': rowSpace === rowSpaces[index] }"
          v-for="(prompt, index) in rowSpacePrompts"
          :key="index"
          @click.stop="() => onPromptClicked(index)"
        >
          {{ prompt }}
          <img
            class="day-mode-item active-item"
            src="./../../../assets/checked.png"
            alt="day mode checked icon"
          />
          <img
            class="night-mode-item active-item"
            src="./../../../assets/checked-night.png"
            alt="night mode checked icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { rowSpaces, rowSpacePrompts } from './../../../utils/consts.js'

export default {
  name: 'MoreSetting.RowHeightPrompt',
  computed: {
    ...mapState({
      rowSpace: state => state.userConfig.rowSpace
    })
  },
  data () {
    return {
      rowSpaces,
      rowSpacePrompts
    }
  },
  methods: {
    ...mapMutations([
      'setRowSpace',
      'setRowHeightPromptShow'
    ]),
    /**
     * 选项点击响应
     * - 设置行高
     */
    onPromptClicked (index) {
      const rowSpace = this.rowSpaces[index]
      this.setRowSpace(rowSpace)
    },
    /**
     * 关闭选项
     */
    closePrompt () {
      this.setRowHeightPromptShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.row-height-prompt {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: @coverBackground;
  .content {
    width: 100%;
    padding: 0 0.65rem;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0.65rem;
    display: flex;
    flex-direction: column;
    .wrapper {
      background: @secondBackground;
      border-radius: 0.4rem;
      .prompt {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.5rem;
        font-size: 0.5rem;
        padding: 0 0.6rem;
        border-bottom: thin solid @borderColor;
        &:last-child {
          border-bottom: none;
        }
        > img {
          width: 1rem;
        }
      }
    }
  }
}
.night-mode {
  .row-height-prompt {
    .content {
      .wrapper {
        background: @backgroundNight;
        .prompt {
          border-bottom-color: @borderColorNight;
        }
      }
    }
  }
}
</style>
