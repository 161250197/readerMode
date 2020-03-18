<template>
  <div
    ref="wrapper"
    class="up-down-wrapper"
  >
    <div
      class="chapter-wrapper"
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
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preloadPageCount } from './../../../utils/consts.js'
import { debounce } from './../../../utils/tools.js'

export default {
  name: 'MainBody.UpDown',
  computed: {
    ...mapState({
      deviceHeight: state => state.deviceData.deviceSize.height,
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
      chapterTitleCheckTop: 0,
      visibleHeight: 0,
      preloadHeight: 0,
      contentHeight: 0
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
      let scrollTop = this.$refs.wrapper.scrollTop + this.visibleHeight
      this.$refs.wrapper.scrollTop = scrollTop
      this.checkUpdateReadingChapterTitle()
      if (this.contentHeight - scrollTop < this.preloadHeight) {
        this.checkPreloadNextChapter()
      }
    },
    /**
     * 翻至上一页
     */
    goPrevPage () {
      let scrollTop = this.$refs.wrapper.scrollTop - this.visibleHeight
      this.$refs.wrapper.scrollTop = scrollTop
      this.checkUpdateReadingChapterTitle()
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
      const chapterTitles = [...document.querySelectorAll('.up-down-wrapper > .chapter-wrapper > .title-wrapper')]
      const chapterIndex = this.getReadingChapterTitleIndex(chapterTitles, this.chapterIndex, this.isReading)
      if (chapterIndex !== this.chapterIndex) {
        this.chapterIndex = chapterIndex
        const readingChapterTitle = this.chapters[chapterIndex].title
        this.setReadingChapterTitle(readingChapterTitle)
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
      const { scrollHeight, scrollTop } = this.$refs.wrapper
      this.contentHeight = scrollHeight
      if (this.contentHeight - scrollTop < this.preloadHeight) {
        this.loadNextChapter()
      }
    }
  },
  mounted () {
    const { wrapper } = this.$refs
    const { top, height } = wrapper.getBoundingClientRect()
    this.visibleHeight = height
    this.chapterTitleCheckTop = 3 * top
    this.preloadHeight = this.visibleHeight * preloadPageCount
    this.checkPreloadNextChapter()
    wrapper.addEventListener('scroll', debounce(this, this.onWrapperScroll))
  }
}
</script>

<style lang="less" scoped>
.up-down-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .chapter-wrapper {
    padding: 0 0.4rem;
  }
}
</style>
