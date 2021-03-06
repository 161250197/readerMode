<template>
  <div
    ref="wrapper"
    class="left-right"
    :style="{ lineHeight: rowSpace }"
    @touchstart="onWrapperTouchstart"
    @touchmove.prevent="onWrapperTouchmove"
    @touchend="onWrapperTouchend"
    @touchcancel="onWrapperTouchend"
    @mousewheel.prevent
  >
    <div
      class="content"
      :class="{ 'moving': moving }"
      :style="{ transform: `translateX(${moving - (pageIndex + 1) * deviceSize.width}px)` }"
    >
      <div class="loading-prev">
        <div class="loading-prev-prompt">
          {{ hasPrev ? '释放加载上一章' : '已经没有上一章了' }}
        </div>
      </div>
      <div
        ref="chapters"
        class="chapter"
        v-for="({ text, title }, index) in chapters"
        :key="index"
      >
        <div class="title">
          {{ title }}
        </div>
        <div
          class="text"
          :style="{
            textIndent,
            marginBottom: `${visibleHeight}px`
          }"
          v-html="text"
        ></div>
        <div
          v-if="index !== lastChapterIndex"
          :style="{
            height: `${visibleHeight}px`
          }"
          class="ad-wrapper"
        >
          <Ad :index="index" />
        </div>
      </div>
      <div
        v-if="!lastChapterHasNext"
        class="recommend-books-wrapper"
      >
        <RecommendBooks />
      </div>
      <div
        v-if="!lastChapterHasNext"
        class="no-next"
      >
        <div class="no-next-prompt">
          已经没有下一章了
        </div>
      </div>
      <div
        v-else-if="loadNextChapterFail"
        class="loading-next-fail"
      >
        <ErrorDiv
          prompt="加载下一章失败了"
          :retryCallback="loadNextChapter"
        />
      </div>
      <div
        v-else-if="isLoadingNextChapter"
        class="loading-next"
      >
        <LoadingDiv prompt="正在加载下一章" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preloadPageCount } from './../../../utils/consts.js'
import Ad from './Ad'
import RecommendBooks from './RecommendBooks'
import ErrorDiv from './../../utils/ErrorDiv'
import LoadingDiv from './../../utils/LoadingDiv'

export default {
  name: 'MainBody.LeftRight',
  components: {
    Ad,
    RecommendBooks,
    ErrorDiv,
    LoadingDiv
  },
  computed: {
    ...mapState({
      fontSize: state => state.userConfig.fontSize,
      chapterAds: state => state.ad.chapterAds,
      rowSpace: state => state.userConfig.rowSpace,
      textIndent: state => state.userConfig.textIndent,
      deviceSize: state => state.deviceData.deviceSize,
      readingChapterIndex: state => state.mainBody.readingChapterIndex,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadNextChapterFail: state => state.mainBody.loadNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
  },
  data () {
    return {
      lastChapterIndex: 0,
      lastChapterHasNext: true,
      hasPrev: true,
      pageCount: 0,
      chapterCountArr: [],
      touchstartX: 0,
      pageIndex: 0,
      visibleHeight: 0,
      // 初始值设定最小负数，防止初次打开时的滚动动画
      moving: -Number.MIN_VALUE
    }
  },
  watch: {
    /**
     * 字体大小设置更新时
     * - 更新章节页数
     * - 页面重新定位至章节首部
     */
    fontSize () {
      this.$nextTick(() => {
        this.updateChapterCountArr()
        this.scrollToReadingChapterTop()
      })
    },
    /**
     * 行间距大小设置更新时
     * - 更新章节页数
     * - 页面重新定位至章节首部
     */
    rowSpace () {
      this.$nextTick(() => {
        this.updateChapterCountArr()
        this.scrollToReadingChapterTop()
      })
    },
    /**
     * 章节数据更新时
     * - 更新章节相关数据
     */
    chapters () {
      this.updateChapterInfo()
    },
    /**
     * 广告数据更新时
     * - 更新章节页数
     */
    chapterAds () {
      this.$nextTick(this.updateChapterCountArr)
    },
    /**
     * 设备尺寸更新时
     * - 更新设备尺寸相关数据
     * - 更新章节页数
     * - 页面重新定位至章节首部
     */
    deviceSize () {
      this.updateDeviceSizeData()
      this.$nextTick(() => {
        this.updateChapterCountArr()
        this.scrollToReadingChapterTop()
      })
    }
  },
  methods: {
    ...mapMutations([
      'setReadingChapterIndex'
    ]),
    ...mapActions([
      'loadPrevChapter',
      'loadNextChapter'
    ]),
    /**
     * 更新尺寸数据
     */
    updateDeviceSizeData () {
      this.visibleHeight = this.$refs.wrapper.getBoundingClientRect().height
    },
    /**
     * 刷新正文内容位置
     */
    refreshMainBodyPosition () {
      this.updateChapterInfo()
      this.$nextTick(() => {
        if (this.lastChapterHasNext) {
          this.checkPreloadNextChapter()
        }
        this.scrollToReadingChapterTop()
      })
    },
    /**
     * 翻至下一页
     */
    goNextPage () {
      if (this.pageIndex + 1 < this.pageCount) {
        this.pageIndex++
        this.checkUpdateReadingChapterTitle()
      }
      if (this.lastChapterHasNext) {
        this.checkPreloadNextChapter()
      }
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
      this.lastChapterIndex = this.chapters.length - 1
      const lastChapter = this.chapters[this.lastChapterIndex]
      this.lastChapterHasNext = lastChapter.hasNext
      this.updateHasPrev()
      this.$nextTick(this.updateChapterCountArr)
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
      const chapters = [...this.$refs.chapters]
      const deviceWidth = this.deviceSize.width
      this.chapterCountArr = chapters.map(chapter => Math.round(chapter.getBoundingClientRect().width / deviceWidth))
      // 最后还有一页
      this.pageCount = this.chapterCountArr.reduce((n1, n2) => n1 + n2) + 1
    },
    /**
     * 检查并更新章节标题
     */
    checkUpdateReadingChapterTitle () {
      let pageSum = 0
      let chapterIndex = 0
      for (; chapterIndex <= this.lastChapterIndex; chapterIndex++) {
        pageSum = pageSum + this.chapterCountArr[chapterIndex]
        if (this.pageIndex < pageSum) {
          break
        }
      }
      if (chapterIndex > this.lastChapterIndex) {
        chapterIndex = this.lastChapterIndex
      }
      this.setReadingChapterIndex(chapterIndex)
    },
    /**
     * 检查并预加载下一章
     */
    checkPreloadNextChapter () {
      if (this.isLoadingNextChapter || this.loadNextChapterFail) {
        console.log('[INFO] checkPreloadNextChapter isLoaing or fail return')
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
      const deviceWidth = this.deviceSize.width
      if (moving < 0) {
        if (this.pageIndex + 1 === this.pageCount) {
          this.moving = Math.max(moving, -deviceWidth / 2)
        } else {
          this.moving = Math.max(moving, -deviceWidth)
        }
      } else {
        if (this.pageIndex === 0) {
          this.moving = Math.min(moving, deviceWidth / 2)
        } else {
          this.moving = Math.min(moving, deviceWidth)
        }
      }
    },
    /**
     * touchend 事件处理
     */
    onWrapperTouchend () {
      if (this.moving) {
        // 避免第一次使用时点击呼出菜单栏触发翻至下一页
        if (this.moving < -Number.MIN_VALUE) {
          this.goNextPage()
        } else if (this.moving > 0) {
          this.goPrevPage(true)
        }
        this.moving = 0
      }
    },
    /**
     * 滑动到正在阅读的章节首
     */
    scrollToReadingChapterTop () {
      // 不使用滑动特效
      this.moving = -Number.MIN_VALUE
      if (this.readingChapterIndex === 0) {
        this.pageIndex = 0
        return
      }
      let pageIndex = 0
      for (let chapterIndex = 0; chapterIndex < this.readingChapterIndex; chapterIndex++) {
        pageIndex = pageIndex + this.chapterCountArr[chapterIndex]
      }
      this.pageIndex = pageIndex
    }
  },
  mounted () {
    this.updateDeviceSizeData()
    this.updateChapterInfo()
    this.$nextTick(() => {
      if (this.lastChapterHasNext) {
        this.checkPreloadNextChapter()
      }
      this.scrollToReadingChapterTop()
    })
    window.__readerModeObject = {
      ...window.__readerModeObject,
      refreshMainBodyPosition: this.refreshMainBodyPosition
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');
@import url('./chapter.less');

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
    .loading-prev {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .loading-prev-prompt {
        width: 1em;
        margin-right: 1em;
      }
    }
    .chapter {
      &:last-child {
        margin-bottom: 0 !important;
      }
      .ad-wrapper {
        display: flex;
        align-items: center;
      }
    }
    .recommend-books-wrapper {
      width: 10.8rem;
      height: 100%;
      display: flex;
    }
    .no-next {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .no-next-prompt {
        width: 1em;
        margin-left: 1em;
      }
    }
    .no-next,
    .loading-prev,
    .loading-next,
    .loading-next-fail {
      width: 10.8rem;
      height: 100%;
    }
  }
}
.night-mode {
  .left-right {
    .content {
      .chapter {
        .title {
          border-bottom-color: @borderColorNight;
        }
      }
    }
  }
}
</style>
