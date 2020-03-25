<template>
  <div
    class="item row-height"
    @click.stop="openRowHeightPrompt"
  >
    <div class="title">
      行间距设置
    </div>
    <div class="content">
      {{ rowSpacePrompt }}
      <img
        class="day-mode-item"
        src="./../../../assets/arrow-right.png"
        alt="day mode arrow-right icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/arrow-right-night.png"
        alt="night mode arrow-right icon"
      />
    </div>
    <RowHeightPrompt v-show="rowHeightPromptShow" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RowHeightPrompt from './RowHeightPrompt'

export default {
  name: 'MoreSetting',
  components: {
    RowHeightPrompt
  },
  computed: {
    ...mapState({
      rowHeightPromptShow: state => state.showState.rowHeightPromptShow,
      rowSpacePrompt: state => state.userConfig.rowSpacePrompt
    })
  },
  methods: {
    ...mapMutations([
      'setRowHeightPromptShow'
    ]),
    /**
     * 打开行高选项弹窗
     */
    openRowHeightPrompt () {
      this.setRowHeightPromptShow(true)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./more-setting-item.less');

.row-height {
  .content {
    display: flex;
    align-items: center;
    font-size: 0.5rem;
    img {
      width: 0.6rem;
    }
  }
}
</style>
