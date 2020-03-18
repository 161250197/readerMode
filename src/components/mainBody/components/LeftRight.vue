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
import { mapState, mapMutations, mapActions } from 'vuex'
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
      chapterIndex: 0,
      pageCount: 0,
      chapterCountArr: [],
      touchstartX: 0,
      pageIndex: 0,
      moving: 0
    }
  },
  watch: {
    chapters () {
      this.$nextTick(this.updateChapterCountArr)
    }
  },
  methods: {
    ...mapMutations([
      'setReadingChapterTitle'
    ]),
    ...mapActions([
      'loadPrevChapter',
      'loadNextChapter'
    ]),
    /**
     * 翻至下一页
     */
    goNextPage () {
      if (this.pageIndex < this.pageCount) {
        this.pageIndex++
        this.checkUpdateReadingChapterTitle()
      }
      if (this.pageCount - this.pageIndex < preloadPageCount) {
        this.checkPreloadNextChapter()
      }
    },
    /**
     * 翻至上一页
     */
    goPrevPage () {
      if (this.pageIndex > 0) {
        this.pageIndex--
        this.checkUpdateReadingChapterTitle()
      }
    },
    /**
     * 更新章节页数数组
     */
    updateChapterCountArr () {
      const chapters = [...document.querySelectorAll('.left-right-wrapper > .content-wrapper > .chapter-wrapper')]
      this.chapterCountArr = chapters.map(chapter => Math.round(chapter.getBoundingClientRect().width / this.deviceWidth))
    },
    /**
     * 检查并更新章节标题
     */
    checkUpdateReadingChapterTitle () {
      let pageSum = 0
      const chapterCount = this.chapterCountArr.length
      let chapterIndex = 0
      for (; chapterIndex < chapterCount; chapterIndex++) {
        pageSum = pageSum + this.chapterCountArr[chapterIndex]
        if (this.pageIndex < pageSum) {
          break
        }
      }
      const readingChapterTitle = this.chapters[chapterIndex].title
      this.setReadingChapterTitle(readingChapterTitle)
    },
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
          this.goNextPage()
        } else {
          this.goPrevPage()
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
