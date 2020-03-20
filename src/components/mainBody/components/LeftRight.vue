<template>
  <div
    class="left-right"
    @touchstart="onWrapperTouchstart"
    @touchmove.prevent="onWrapperTouchmove"
    @touchend="onWrapperTouchend"
    @touchcancel="onWrapperTouchend"
    @mousewheel.prevent
  >
    <div
      class="content"
      :class="{ 'moving': moving }"
      :style="{ transform: `translateX(${moving - (pageIndex + 1) * deviceWidth}px)` }"
    >
      <div class="loading-prev">
        {{ hasPrev ? '释放加载上一章' : '已经没有上一章了' }}
      </div>
      <div
        class="chapter"
        :style="{marginBottom: `${deviceHeight}px`}"
        v-for="({ text, title, chapterIndex }) in chapters"
        :key="chapterIndex"
      >
        <div class="title">
          {{ title }}
        </div>
        <div
          class="text"
          v-html="text"
        ></div>
      </div>
      <div
        v-show="loadingNextChapterFail"
        class="loading-next-fail"
      >
        <ErrorDiv
          prompt="加载下一章失败了"
          :retryCallback="loadNextChapter"
        />
      </div>
      <div
        v-show="!loadingNextChapterFail && isLoadingNextChapter"
        class="loading-next"
      >
        <LoadingDiv prompt="正在加载下一章" />
      </div>
      <div
        v-show="!(isLoadingNextChapter || loadingNextChapterFail)"
        class="see-more"
      >
        TODO
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preloadPageCount } from './../../../utils/consts.js'
import ErrorDiv from './../../utils/ErrorDiv'
import LoadingDiv from './../../utils/LoadingDiv'

export default {
  name: 'MainBody.LeftRight',
  components: {
    ErrorDiv,
    LoadingDiv
  },
  computed: {
    ...mapState({
      deviceHeight: state => state.deviceData.deviceSize.height,
      deviceWidth: state => state.deviceData.deviceSize.width,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadingNextChapterFail: state => state.mainBody.loadingNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
  },
  data () {
    return {
      hasPrev: true,
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
      this.$nextTick(this.updateChapterInfo)
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
      if (this.pageIndex + 1 < this.pageCount) {
        this.pageIndex++
        this.checkUpdateReadingChapterTitle()
      }
      this.checkPreloadNextChapter()
    },
    /**
     * 翻至上一页
     * @param {Boolean} isMoving 是否由滑动触发
     */
    goPrevPage (isMoving) {
      if (this.pageIndex > 0) {
        this.pageIndex--
        this.checkUpdateReadingChapterTitle()
      } else if (isMoving && this.hasPrev) {
        this.loadPrevChapter()
      }
    },
    /**
     * 更新章节相关数据
     */
    updateChapterInfo () {
      this.updateHasPrev()
      this.updateChapterCountArr()
    },
    /**
     * 更新是否有上一章
     */
    updateHasPrev () {
      const prevChapterIndex = this.chapters[0].chapterIndex - 1
      this.hasPrev = prevChapterIndex >= 0
    },
    /**
     * 更新章节页数数组
     */
    updateChapterCountArr () {
      const chapters = [...document.querySelectorAll('.left-right > .content > .chapter')]
      this.chapterCountArr = chapters.map(chapter => Math.round(chapter.getBoundingClientRect().width / this.deviceWidth))
      // 最后还有一页
      this.pageCount = this.chapterCountArr.reduce((n1, n2) => n1 + n2) + 1
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
      if (chapterIndex === chapterCount) {
        chapterIndex = chapterCount - 1
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
      const lastChapter = this.chapters[this.chapters.length - 1]
      if (!lastChapter.hasNext) {
        console.log('[INFO] checkPreloadNextChapter no next chapter')
        return
      }
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
          this.goPrevPage(true)
        }
        this.moving = 0
      }
    }
  },
  mounted () {
    this.updateChapterInfo()
    this.checkPreloadNextChapter()
  }
}
</script>

<style lang="less" scoped>
.left-right {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
    column-width: 10.8rem;
    column-gap: 0;
    transition: transform 0.5s;
    &.moving {
      transition: none;
    }
    .chapter {
      padding: 0 0.4rem;
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
    .loading-prev,
    .see-more,
    .loading-next,
    .loading-next-fail {
      width: 10.8rem;
      height: 100%;
    }
  }
}
</style>
