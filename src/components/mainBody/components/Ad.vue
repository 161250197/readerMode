<template>
  <div
    v-if="chapterAds[index]"
    class="ad"
    @click.stop="jumpToAdPage"
  >
    <div class="header">
      <div class="title">
        {{ chapterAds[index].title }}
      </div>
      <div class="ad-tag">
        {{ adTag }}
      </div>
    </div>
    <div class="info">
      {{ chapterAds[index].info }}
    </div>
    <img
      :src="chapterAds[index].picture"
      alt="ad picture"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MainBody.Ad',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      chapterAds: state => state.ad.chapterAds
    })
  },
  data () {
    return {
      jumpToAdFailMessage: '跳转广告页面失败，请稍后重试',
      adTag: '广告'
    }
  },
  methods: {
    ...mapMutations([
      'setPromptMessage'
    ]),
    ...mapActions([
      'loadAd'
    ]),
    /**
     * 跳转广告页面
     */
    jumpToAdPage () {
      const result = window.__browserObject.jumpToAdPage(this.chapterAds[this.index].adId)
      if (result) {
        console.log('[INFO] jumpToAdPage success')
      } else {
        this.setPromptMessage(this.jumpToAdFailMessage)
      }
    }
  },
  mounted () {
    if (!this.chapterAds[this.index]) {
      this.loadAd(this.index)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.ad {
  width: 100%;
  margin: 0.2rem 0;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
  background: @secondBackground;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.4rem;
    line-height: 0.9rem;
    border-bottom: thin solid @borderColor;
  }
  .info {
    font-size: 0.45rem;
    line-height: 1rem;
  }
  img {
    width: 100%;
  }
}
.night-mode {
  .ad {
    background: @secondBackgroundNight;
    .header {
      border-bottom-color: @borderColorNight;
    }
    img {
      filter: brightness(0.5);
    }
  }
}
</style>
