import { api } from './../../apis/api'

/**
 * 正文 store
 */
const store = {
  state: {
    isLoadingMainBodyContent: true,
    loadingMainBodyContentFail: false,
    isLoadingPrevChapter: false,
    loadingPrevChapterFail: false,
    isLoadingNextChapter: false,
    loadingNextChapterFail: false,
    readingChapterTitle: '',
    chapters: []
  },
  mutations: {
    /**
     * 设置章节标题
     * @param {Object} state mainBody.state
     * @param {String} value 值
     */
    setReadingChapterTitle (state, value) {
      state.readingChapterTitle = value
    },
    /**
     * 设置正在加载正文
     * @param {Object} state mainBody.state
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingMainBodyContent (state, value) {
      state.isLoadingMainBodyContent = value
    },
    /**
     * 设置加载正文失败
     * @param {Object} state mainBody.state
     * @param {Boolean} value 值
     * @private
     */
    setLoadingMainBodyContentFail (state, value) {
      state.loadingMainBodyContentFail = value
    },
    /**
     * 设置正在加载上一章
     * @param {Object} state mainBody.state
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingPrevChapter (state, value) {
      state.isLoadingPrevChapter = value
    },
    /**
     * 设置加载上一章失败
     * @param {Object} state mainBody.state
     * @param {Boolean} value 值
     * @private
     */
    setLoadingPrevChapterFail (state, value) {
      state.loadingPrevChapterFail = value
    },
    /**
     * 设置正在加载下一章
     * @param {Object} state mainBody.state
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingNextChapter (state, value) {
      state.isLoadingNextChapter = value
    },
    /**
     * 设置加载下一章失败
     * @param {Object} state mainBody.state
     * @param {Boolean} value 值
     * @private
     */
    setLoadingNextChapterFail (state, value) {
      state.loadingNextChapterFail = value
    },
    /**
     * 设置章节数组
     * @param {Object} state mainBody.state
     * @param {Array<{text: String, title: String, chapterIndex: Number, hasNext: Boolean}>} chapters 章节数组
     * @private
     */
    setChapters (state, chapters) {
      state.chapters = [...chapters]
    }
  },
  actions: {
    /**
     * 初始化小说正文内容
     */
    async loadMainBodyContent ({ commit }) {
      commit('setIsLoadingMainBodyContent', true)
      commit('setLoadingMainBodyContentFail', false)
      try {
        const {
          domain,
          novelName,
          authorName,
          chapterIndex
        } = this.state
        const { data } = await api.getMainBodyText(domain, novelName, authorName, chapterIndex)
        const chapter = {
          ...data,
          chapterIndex
        }
        commit('setChapters', [chapter])
        commit('setReadingChapterTitle', chapter.title)
      } catch (e) {
        console.log('[ERROR] loadMainBodyContent ', e)
        commit('setLoadingMainBodyContentFail', true)
      }
      commit('setIsLoadingMainBodyContent', false)
    },
    /**
     * 加载小说上一章
     */
    async loadPrevChapter ({ commit, state }) {
      commit('setIsLoadingPrevChapter', true)
      commit('setLoadingPrevChapterFail', false)
      const prevChapterIndex = state.chapters[0].chapterIndex - 1
      if (prevChapterIndex < 0) {
        console.log('[INFO] loadPrevChapter no prev chapter')
        commit('setIsLoadingPrevChapter', false)
        return
      }
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        const { data } = await api.getMainBodyText(domain, novelName, authorName, prevChapterIndex)
        const chapter = {
          ...data,
          chapterIndex: prevChapterIndex
        }
        commit('setChapters', [chapter])
      } catch (e) {
        console.log('[ERROR] loadPrevChapter ', e)
        commit('setLoadingPrevChapterFail', true)
      }
      commit('setIsLoadingPrevChapter', false)
    },
    /**
     * 加载小说下一章
     */
    async loadNextChapter ({ commit, state }) {
      commit('setIsLoadingNextChapter', true)
      commit('setLoadingNextChapterFail', false)
      let { chapters } = state
      const lastChapter = chapters[chapters.length - 1]
      if (!lastChapter.hasNext) {
        console.log('[INFO] loadNextChapter no next chapter')
        commit('setIsLoadingNextChapter', false)
        return
      }
      const nextChapterIndex = lastChapter.chapterIndex + 1
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        const { data } = await api.getMainBodyText(domain, novelName, authorName, nextChapterIndex)
        const chapter = {
          ...data,
          chapterIndex: nextChapterIndex
        }
        commit('setChapters', [...chapters, chapter])
      } catch (e) {
        console.log('[ERROR] loadNextChapter ', e)
        commit('setLoadingNextChapterFail', true)
      }
      commit('setIsLoadingNextChapter', false)
    }
  }
}

export default store
