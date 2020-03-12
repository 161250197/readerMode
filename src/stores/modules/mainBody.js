import { api } from './../../apis/api'

const store = {
  state: {
    isLoadingPrevChapter: false,
    isLoadingNextChapter: false,
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
     * 设置正在加载下一章
     * @param {Object} state mainBodyState
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingNextChapter (state, value) {
      state.isLoadingPrevChapter = !!value
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
      commit('setChapters', [{
        ...data,
        chapterIndex
      }])
    },
    async loadingPrevChapter ({ commit }) {
      // TODO
    },
    async loadingNextChapter ({ commit }) {
      // TODO
    }
  }
}

export default store
