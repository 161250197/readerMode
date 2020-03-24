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
      :style="{ transform: `translateX(${moving - (pageIndex + 1) * deviceSize.width}px)` }"
    >
      <div class="loading-prev">
        {{ hasPrev ? '释放加载上一章' : '已经没有上一章了' }}
      </div>
      <div
        class="chapter"
        :style="{ marginBottom: `${deviceSize.height}px` }"
        v-for="({ text, title, chapterIndex }) in chapters"
        :key="chapterIndex"
      >
        <div class="title">
          {{ title }}
        </div>
        <div
          class="text"
          :style="{ textIndent }"
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
      textIndent: state => state.userConfig.textIndent,
      deviceSize: state => state.deviceData.deviceSize,
      readingChapterIndex: state => state.mainBody.readingChapterIndex,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadingNextChapterFail: state => state.mainBody.loadingNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
  },
  data () {
    return {
      hasPrev: true,
      pageCount: 0,
      chapterCountArr: [],
      touchstartX: 0,
      pageIndex: 0,
      // 初始值设定最小负数，防止初次打开时的滚动动画
      moving: -Number.MIN_VALUE
    }
  },
  watch: {
    /**
     * 章节数据更新时需要更新章节相关数据
     */
    chapters () {
      this.$nextTick(this.updateChapterInfo)
    },
    /**
     * 设备尺寸更新时需要更新章节相关数据
     * - 页面重新定位至章节首部
     */
    deviceSize () {
      this.$nextTick(() => {
        this.updateChapterInfo()
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
      this.setReadingChapterIndex(chapterIndex)
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
      const deviceWidth = this.deviceSize.width
      if (moving < 0) {
        this.moving = Math.max(moving, -deviceWidth)
      } else {
        this.moving = Math.min(moving, deviceWidth)
      }
    },
    /**
     * touchend 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchend (e) {
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
    this.updateChapterInfo()
    this.checkPreloadNextChapter()
    this.scrollToReadingChapterTop()
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

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
      .title {
        text-align: center;
        font-size: 125%;
        line-height: 150%;
        border-bottom: thin solid @borderColor;
      }
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
