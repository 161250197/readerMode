<template>
  <div class="change-source">
    <ErrorDiv
      v-if="loadNovelSourcesFail"
      :prompt="errorPrompt"
      :retryCallback="loadNovelSources"
    />
    <LoadingDiv
      v-else-if="isLoadingNovelSources"
      :prompt="loadingPrompt"
    />
    <div
      v-else
      class="item"
      :class="{
        'present': index === presentNovelSourceIndex,
        'used': usedNovelSources[index]
      }"
      v-for="({ siteName, domain }, index) in novelSources"
      :key="index"
      @click.stop="() => onNovelSourceClick(index)"
    >
      <div class="site-name">
        {{siteName}}
      </div>
      <div class="domain">
        {{domain}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ErrorDiv from './../../utils/ErrorDiv'
import LoadingDiv from './../../utils/LoadingDiv'

export default {
  name: 'UserMenu.ChangeSource',
  components: {
    ErrorDiv,
    LoadingDiv
  },
  computed: {
    ...mapState({
      isLoadingNovelSources: state => state.novelSource.isLoadingNovelSources,
      loadNovelSourcesFail: state => state.novelSource.loadNovelSourcesFail,
      usedNovelSources: state => state.novelSource.usedNovelSources,
      presentNovelSourceIndex: state => state.novelSource.presentNovelSourceIndex,
      novelSources: state => state.novelSource.novelSources
    })
  },
  data () {
    return {
      errorPrompt: '加载换源列表失败了',
      loadingPrompt: '加载换源列表中……'
    }
  },
  methods: {
    ...mapMutations([
      'setUserMenuShow'
    ]),
    ...mapActions([
      'changeSource',
      'loadNovelSources'
    ]),
    /**
     * 换源
     * @param {Number} index 索引
     */
    onNovelSourceClick (index) {
      if (index !== this.presentNovelSourceIndex) {
        this.changeSource(index)
          .then(() => {
            window.__readerModeObject.refreshMainBodyPosition()
            this.setUserMenuShow()
            // TODO 添加提示
          })
          .catch(e => {
            // TODO 添加提示
            console.log('[ERROR] onNovelSourceClick changeSource fail')
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.change-source {
  width: 100%;
  height: 6rem;
  overflow-y: scroll;
  background: @secondBackground;
  display: flex;
  flex-direction: column;
  .item {
    box-sizing: border-box;
    margin: 0 0.65rem;
    padding: 0.2rem 0;
    &:nth-last-child(n + 2) {
      border-bottom: 1px solid @borderColor;
    }
    &.used {
      color: @secondColor;
    }
    &.present {
      color: @primaryColor;
    }
    .site-name {
      font-weight: bold;
      font-size: 0.45rem;
      line-height: 0.6rem;
    }
    .domain {
      font-size: 0.4rem;
      line-height: 0.6rem;
    }
  }
}
.night-mode {
  .change-source {
    background: @secondBackgroundNight;
    .item {
      &:nth-last-child(n + 2) {
        border-bottom-color: @borderColorNight;
      }
      &.used {
        color: @secondColorNight;
      }
      &.present {
        color: @primaryColorNight;
      }
    }
  }
}
</style>
