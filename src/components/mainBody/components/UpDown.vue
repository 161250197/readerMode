<template>
  <div
    ref="wrapper"
    class="up-down"
    @touchstart="onWrapperTouchstart"
    @touchmove="onWrapperTouchmove"
    @touchend="onWrapperTouchend"
    @touchcancel="onWrapperTouchend"
  >
    <div
      class="content"
      :class="{ 'moving': moving }"
      :style="{ transform: `translateY(${moving - loadingPrevHeight}px)` }"
    >
      <div class="loading-prev">
        {{ hasPrev ? '释放加载上一章' : '已经没有上一章了' }}
      </div>
      <div
        class="chapter"
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
import { debounce } from './../../../utils/tools.js'
import ErrorDiv from './../../utils/ErrorDiv'
import LoadingDiv from './../../utils/LoadingDiv'

export default {
  name: 'MainBody.UpDown',
  components: {
    ErrorDiv,
    LoadingDiv
  },
  computed: {
    ...mapState({
      deviceSize: state => state.deviceData.deviceSize,
      readingChapterIndex: state => state.mainBody.readingChapterIndex,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadingNextChapterFail: state => state.mainBody.loadingNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
  },
  data () {
    return {
      isTop: true,
      hasPrev: true,
      touchstartY: 0,
      // 初始值设定最小负数，防止初次打开时的滚动动画
      moving: -Number.MIN_VALUE,
      chapterTitleCheckTop: 0,
      loadingPrevHeight: 0,
      visibleTop: 0,
      visibleHeight: 0,
      preloadHeight: 0,
      contentHeight: 0
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
      this.updateDeviceSizeData()
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
      let scrollTop = this.$refs.wrapper.scrollTop + this.visibleHeight
      this.$refs.wrapper.scrollTop = scrollTop
      this.checkUpdateReadingChapterTitle()
      if (this.contentHeight - scrollTop < this.preloadHeight) {
        this.checkPreloadNextChapter()
      }
    },
    /**
     * 翻至上一页
     * @param {Boolean} isMoving 是否由滑动触发
     */
    goPrevPage (isMoving) {
      let scrollTop = this.$refs.wrapper.scrollTop
      if (scrollTop > 0) {
        scrollTop = scrollTop - this.visibleHeight
        this.$refs.wrapper.scrollTop = scrollTop
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
    },
    /**
     * 更新是否有上一章
     */
    updateHasPrev () {
      const prevChapterIndex = this.chapters[0].chapterIndex - 1
      this.hasPrev = prevChapterIndex >= 0
    },
    /**
     * scroll 事件处理
     */
    onWrapperScroll () {
      this.checkUpdateReadingChapterTitle()
      this.checkPreloadNextChapter()
    },
    /**
     * 检查并更新章节标题
     */
    checkUpdateReadingChapterTitle () {
      const chapterTitles = [...document.querySelectorAll('.up-down > .content > .chapter > .title')]
      const chapterIndex = this.getReadingChapterTitleIndex(chapterTitles, this.readingChapterIndex, this.isReading)
      if (chapterIndex !== this.readingChapterIndex) {
        this.setReadingChapterIndex(chapterIndex)
      }
    },
    /**
     * 检查是否正在阅读
     * @param {Element} chapterTitle 章节标题节点
     * @returns {Boolean} 是否正在阅读
     */
    isReading (chapterTitle) {
      const titleTop = chapterTitle.getBoundingClientRect().top
      return titleTop <= this.chapterTitleCheckTop
    },
    /**
     * 获取正在阅读的章节标题索引
     * @param {Array<Element>} chapterTitles 章节标题节点数组
     * @param {Number} lastChapterIndex 上一次阅读的章节索引
     * @param {(chapterTitle: Element) => Boolean} isReading 检查是否正在阅读的方法
     * @returns {Number} 正在阅读的章节标题索引
     */
    getReadingChapterTitleIndex (chapterTitles, lastChapterIndex, isReading) {
      let left = 0
      let right = chapterTitles.length
      if (isReading(chapterTitles[lastChapterIndex])) {
        left = lastChapterIndex
      } else {
        right = lastChapterIndex
      }
      while (left < right) {
        let half = left + Math.floor((right - left) / 2)
        if (isReading(chapterTitles[half])) {
          if (left === half) {
            break
          }
          left = half
        } else {
          if (right === half) {
            break
          }
          right = half
        }
      }
      return left
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
      const { scrollHeight, scrollTop } = this.$refs.wrapper
      this.contentHeight = scrollHeight
      if (this.contentHeight - scrollTop < this.preloadHeight) {
        this.loadNextChapter()
      }
    },
    /**
     * touchstart 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchstart (e) {
      this.isTop = this.$refs.wrapper.scrollTop === 0
      this.touchstartY = e.touches[0].clientY
    },
    /**
     * touchmove 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchmove (e) {
      if (!this.isTop) {
        return
      }
      let moving = e.touches[0].clientY - this.touchstartY
      if (moving >= 0) {
        this.moving = Math.min(moving, this.visibleHeight / 2)
      }
    },
    /**
     * touchend 事件处理
     * @param {TouchEvent} e
     */
    onWrapperTouchend (e) {
      if (this.moving) {
        if (this.moving > 0) {
          this.goPrevPage(true)
        }
        this.moving = 0
      }
    },
    /**
     * 滑动到正在阅读的章节首
     * @param {Boolean} isfirstUpdate 是否为第一次展示
     */
    scrollToReadingChapterTop (isfirstUpdate) {
      // 不使用滑动特效
      this.moving = -Number.MIN_VALUE
      // 开头还有一个 .loading-prev
      const title = document.querySelector(`.up-down > .content > .chapter:nth-child(${this.readingChapterIndex + 2}) > .title`)
      // 高度需要减去 .loading-prev 和 DeviceInfo 的高度
      let scrollTop = this.$refs.wrapper.scrollTop
      const titleTop = title.getBoundingClientRect().top
      scrollTop = scrollTop + titleTop - this.visibleTop
      if (isfirstUpdate) {
        scrollTop = scrollTop - this.visibleHeight / 2
      }
      this.$refs.wrapper.scrollTop = scrollTop
    },
    /**
     * 更新尺寸数据
     */
    updateDeviceSizeData () {
      const { top, height } = this.$refs.wrapper.getBoundingClientRect()
      this.visibleHeight = height
      this.loadingPrevHeight = this.visibleHeight / 2
      this.visibleTop = top
      this.chapterTitleCheckTop = 3 * this.visibleTop
      this.preloadHeight = this.visibleHeight * preloadPageCount
    }
  },
  mounted () {
    this.updateDeviceSizeData()
    this.updateChapterInfo()
    this.checkPreloadNextChapter()
    this.$refs.wrapper.addEventListener('scroll', debounce(this, this.onWrapperScroll))
    this.scrollToReadingChapterTop(true)
  }
}
</script>

<style lang="less" scoped>
.up-down {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .content {
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    &.moving {
      transition: none;
    }
    .chapter {
      padding: 0 0.4rem;
    }
    .loading-prev,
    .see-more,
    .loading-next,
    .loading-next-fail {
      width: 100%;
      height: 50%;
    }
  }
}
</style>
