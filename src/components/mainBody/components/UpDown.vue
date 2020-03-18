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
import { mapState, mapActions } from 'vuex'
import { preloadPageCount } from './../../../utils/consts.js'
import { debounce } from './../../../utils/tools'

export default {
  name: 'MainBody.UpDown',
  computed: {
    ...mapState({
      isLoadingPrevChapter: state => state.mainBody.isLoadingPrevChapter,
      loadingPrevChapterFail: state => state.mainBody.loadingPrevChapterFail,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadingNextChapterFail: state => state.mainBody.loadingNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
  },
  data () {
    return {
      contentHeight: 0
    }
  },
  methods: {
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
      if (this.contentHeight - scrollTop < this.preloadHeight) {
        this.checkPreloadNextChapter()
      }
    },
    /**
     * 翻至上一页
     */
    goPrevPage () {
      const { scrollTop } = this.$refs.wrapper
      this.$refs.wrapper.scrollTop = scrollTop - this.visibleHeight
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
    this.visibleHeight = wrapper.getBoundingClientRect().height
    this.preloadHeight = this.visibleHeight * preloadPageCount
    this.checkPreloadNextChapter()
    wrapper.addEventListener('scroll', debounce(this, this.checkPreloadNextChapter))
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
