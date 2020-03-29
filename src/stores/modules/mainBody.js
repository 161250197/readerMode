import { api } from './../../apis/api'

/**
 * 正文 store
 */
const store = {
  state: {
    isLoadingMainBodyContent: true,
    loadMainBodyContentFail: false,
    isLoadingNextChapter: false,
    loadNextChapterFail: false,
    readingChapterTitle: '',
    readingChapterIsBookmarked: false,
    readingChapterIndex: 0,
    chapters: []
  },
  mutations: {
    /**
     * 设置章节正文
     * @param {{ text: String, title: String, chapterIndex: Number, hasNext: Boolean }} chapters 章节数组
     */
    setMainBody (_, chapter) {
      this.commit('setChapters', [chapter])
      this.commit('setReadingChapterIndex', 0)
    },
    /**
     * 设置当前正在阅读的章节索引
     * - 更新正在阅读的章节的总索引 state.chapterIndex
     * - 更新正在阅读的章节标题
     * - 更新正在阅读的章节是否已加入书签
     * @param {Object} state mainBody.state
     * @param {Number} value 值
     */
    setReadingChapterIndex (state, value) {
      state.readingChapterIndex = value
      const readingChapter = state.chapters[value]
      const { title, chapterIndex } = readingChapter
      state.readingChapterTitle = title
      this.commit('setChapterIndex', chapterIndex)
      this.commit('updateReadingChapterIsBookmarked')
    },
    /**
     * 更新正在阅读的章节是否已加入书签
     * - 章节数组未加载完成时不做操作
     * @param {Object} state mainBody.state
     */
    updateReadingChapterIsBookmarked (state) {
      const {
        chapterIndex,
        domain,
        novelName,
        authorName
      } = this.state
      const isBookmarked = window.__browserObject.isBookmarked(domain, novelName, authorName, chapterIndex)
      state.readingChapterIsBookmarked = isBookmarked
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
    setLoadMainBodyContentFail (state, value) {
      state.loadMainBodyContentFail = value
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
    setLoadNextChapterFail (state, value) {
      state.loadNextChapterFail = value
    },
    /**
     * 设置章节数组
     * @param {Object} state mainBody.state
     * @param {Array<{ text: String, title: String, chapterIndex: Number, hasNext: Boolean }>} chapters 章节数组
     * @private
     */
    setChapters (state, chapters) {
      state.chapters = [...chapters]
    }
  },
  actions: {
    /**
     * 初始化小说正文内容换源
     */
    loadMainBodyContentChangeSource (_, domain) {
      const {
        chapterIndex,
        novelName,
        authorName
      } = this.state
      return api.getMainBodyText(domain, novelName, authorName, chapterIndex)
    },
    /**
     * 初始化小说正文内容
     */
    async loadMainBodyContent ({ commit }) {
      commit('setIsLoadingMainBodyContent', true)
      commit('setLoadMainBodyContentFail', false)
      try {
        const {
          domain,
          novelName,
          authorName,
          chapterIndex
        } = this.state
        const { data } = await api.getMainBodyText(domain, novelName, authorName, chapterIndex)
        commit('setMainBody', data)
      } catch (e) {
        console.log('[ERROR] loadMainBodyContent ', e)
        commit('setLoadMainBodyContentFail', true)
      }
      commit('setIsLoadingMainBodyContent', false)
    },
    /**
     * 加载小说上一章
     */
    async loadPrevChapter ({ dispatch, commit, state }) {
      const prevChapterIndex = state.chapters[0].chapterIndex - 1
      if (prevChapterIndex < 0) {
        console.log('[INFO] loadPrevChapter no prev chapter')
        commit('setIsLoadingPrevChapter', false)
        return
      }
      commit('setChapterIndex', prevChapterIndex)
      dispatch('loadMainBodyContent')
    },
    /**
     * 加载小说下一章
     */
    async loadNextChapter ({ commit, state }) {
      commit('setIsLoadingNextChapter', true)
      commit('setLoadNextChapterFail', false)
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
        commit('setLoadNextChapterFail', true)
      }
      commit('setIsLoadingNextChapter', false)
    }
  }
}

export default store
