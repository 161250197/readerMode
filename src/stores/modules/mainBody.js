import { api } from './../../apis/api'

/**
 * 正文 state
 */
const store = {
  state: {
    isLoadingPrevChapter: false,
    loadingPrevChapterFail: false,
    isLoadingNextChapter: false,
    loadingNextChapterFail: false,
    chapters: []
  },
  mutations: {
    /**
     * 设置正在加载上一章
     * @param {Object} state mainBodyState
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingPrevChapter (state, value) {
      state.isLoadingPrevChapter = !!value
    },
    /**
     * 设置加载上一章失败
     * @param {Object} state mainBodyState
     * @param {Boolean} value 值
     * @private
     */
    setLoadingPrevChapterFail (state, value) {
      state.loadingPrevChapterFail = !!value
    },
    /**
     * 设置正在加载下一章
     * @param {Object} state mainBodyState
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingNextChapter (state, value) {
      state.isLoadingNextChapter = !!value
    },
    /**
     * 设置加载下一章失败
     * @param {Object} state mainBodyState
     * @param {Boolean} value 值
     * @private
     */
    setLoadingNextChapterFail (state, value) {
      state.loadingNextChapterFail = !!value
    },
    /**
     * 设置章节数组
     * @param {Object} state mainBodyState
     * @param {Array<{text: String, title: String, chapterIndex: Number}>} chapters 章节数组
     * @private
     */
    setChapters (state, chapters) {
      state.chapters = [...chapters]
    }
  },
  actions: {
    /**
     * 初始化小说正文内容
     * @throws {Error} 请求失败
     */
    async initMainBodyContent ({ commit }) {
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
    },
    /**
     * 加载小说上一章
     * @throws {Error} 请求失败
     */
    async loadingPrevChapter ({ commit, state }) {
      commit('setIsLoadingPrevChapter', true)
      commit('setLoadingPrevChapterFail', false)
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        let prevChapterIndex = state.chapters[0].chapterIndex - 1
        const { data } = await api.getMainBodyText(domain, novelName, authorName, prevChapterIndex)
        const chapter = {
          ...data,
          chapterIndex: prevChapterIndex
        }
        commit('setChapters', [chapter])
      } catch (e) {
        console.log('[ERROR] loadingPrevChapter ', e)
        commit('setLoadingPrevChapterFail', true)
      }
      commit('setIsLoadingPrevChapter', false)
    },
    /**
     * 加载小说下一章
     */
    async loadingNextChapter ({ commit, state }) {
      commit('setIsLoadingNextChapter', true)
      commit('setLoadingNextChapterFail', false)
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        let { chapters } = state
        let nextChapterIndex = chapters[chapters.length - 1].chapterIndex + 1
        const { data } = await api.getMainBodyText(domain, novelName, authorName, nextChapterIndex)
        const chapter = {
          ...data,
          chapterIndex: nextChapterIndex
        }
        commit('setChapters', [...chapters, chapter])
      } catch (e) {
        console.log('[ERROR] loadingNextChapter ', e)
        commit('setLoadingNextChapterFail', true)
      }
      commit('setIsLoadingNextChapter', false)
    }
  }
}

export default store
