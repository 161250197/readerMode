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
      deviceHeight: state => state.deviceData.deviceSize.height,
      isLoadingPrevChapter: state => state.mainBody.isLoadingPrevChapter,
      loadingPrevChapterFail: state => state.mainBody.loadingPrevChapterFail,
      isLoadingNextChapter: state => state.mainBody.isLoadingNextChapter,
      loadingNextChapterFail: state => state.mainBody.loadingNextChapterFail,
      chapters: state => state.mainBody.chapters
    })
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
      const { scrollHeight, scrollTop } = this.$refs.wrapper
      const height = scrollHeight - scrollTop
      const preloadHeight = this.deviceHeight * preloadPageCount
      if (height < preloadHeight) {
        this.loadNextChapter()
      }
    }
  },
  mounted () {
    this.checkPreloadNextChapter()
    this.$refs.wrapper.addEventListener('scroll', debounce(this, this.checkPreloadNextChapter))
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
