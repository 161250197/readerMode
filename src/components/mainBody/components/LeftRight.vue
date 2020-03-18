<template>
  <div
    ref="wrapper"
    class="left-right-wrapper"
    @touchstart="onWrapperTouchstart"
    @touchmove.prevent="onWrapperTouchmove"
    @touchend="onWrapperTouchend"
    @touchcancel="onWrapperTouchend"
    @mousewheel.prevent
  >
    <div
      class="content-wrapper"
      :class="{ 'moving': moving }"
      :style="{ transform: `translateX(${moving - pageIndex * deviceWidth}px)` }"
    >
      <div
        class="chapter-wrapper"
        :style="{marginBottom: `${deviceHeight}px`}"
        v-for="({ text, title, chapterIndex }) in chapters"
        :key="chapterIndex"
      >
        <div class="title-wrapper">
          {{title}}
        </div>
        <div
          class="text-wrapper"
          v-html="text"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { preloadPageCount } from './../../../utils/consts.js'

export default {
  name: 'MainBody.LeftRight',
  computed: {
    ...mapState({
      deviceHeight: state => state.deviceData.deviceSize.height,
      deviceWidth: state => state.deviceData.deviceSize.width,
      isLoadingPrevChapter: state => state.mainBody.isLoadingPrevChapter,
      loadingPrevChapterFail: state => state.mainBody.loadingPrevChapterFail,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadingNextChapterFail: state => state.mainBody.loadingNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
  },
  data () {
    return {
      pageCount: 0,
      touchstartX: 0,
      pageIndex: 0,
      moving: 0
    }
  },
  methods: {
    ...mapActions([
      'loadPrevChapter',
      'loadNextChapter'
    ]),
    /**
     * 检查并预加载下一章
     */
    checkPreloadNextChapter () {
      if (this.isLoadingNextChapter || this.loadingNextChapterFail) {
        console.log('[INFO] checkPreloadNextChapter isLoaing or fail return')
        return
      }
      const { scrollWidth } = this.$refs.wrapper
      this.pageCount = Math.round(scrollWidth / this.deviceWidth)
      if (this.pageCount - this.pageIndex < preloadPageCount) {
        this.loadNextChapter()
      }
    },
    /**
     * touchstart 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchstart (e) {
      this.touchstartX = e.touches[0].clientX
    },
    /**
     * touchmove 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchmove (e) {
      let moving = e.touches[0].clientX - this.touchstartX
      if (moving < 0) {
        this.moving = Math.max(moving, -this.deviceWidth)
      } else {
        this.moving = Math.min(moving, this.deviceWidth)
      }
    },
    /**
     * touchend 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchend (e) {
      if (this.moving) {
        if (this.moving < 0) {
          this.pageIndex++
          if (this.pageCount - this.pageIndex < preloadPageCount) {
            this.checkPreloadNextChapter()
          }
        } else if (this.pageIndex > 0) {
          this.pageIndex--
        }
        this.moving = 0
      }
    }
  },
  mounted () {
    this.checkPreloadNextChapter()
  }
}
</script>

<style lang="less" scoped>
.left-right-wrapper {
  width: 100%;
  height: 100%;
  .content-wrapper {
    height: 100%;
    column-width: 10.8rem;
    column-gap: 0;
    transition: transform 0.5s;
    &.moving {
      transition: none;
    }
    .chapter-wrapper {
      padding: 0 0.4rem;
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
  }
}
</style>
