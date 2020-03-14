import { api } from './../../apis/api'

/**
 * 目录 state
 */
const store = {
  state: {
    isLoadingCatalogChapters: true,
    loadingCatalogChaptersFail: false,
    catalogChapters: [],
    isLoadingBookMarks: true,
    loadingBookMarksFail: false,
    bookMarks: []
  },
  mutations: {
    /**
     * 设置正在加载章节目录
     * @param {Object} state catalogState
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingCatalogChapters (state, value) {
      state.isLoadingCatalogChapters = !!value
    },
    /**
     * 设置加载章节目录失败
     * @param {Object} state catalogState
     * @param {Boolean} value 值
     * @private
     */
    setLoadingCatalogChaptersFail (state, value) {
      state.loadingCatalogChaptersFail = !!value
    },
    /**
     * 设置章节目录
     * @param {Object} state catalogState
     * @param {Array<String>} catalogChapters 章节目录
     * @private
     */
    setCatalogChapters (state, catalogChapters) {
      state.catalogChapters = [...catalogChapters]
    },
    /**
     * 设置正在加载书签列表
     * @param {Object} state catalogState
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingBookMarks (state, value) {
      state.isLoadingBookMarks = !!value
    },
    /**
     * 设置加载书签列表失败
     * @param {Object} state catalogState
     * @param {Boolean} value 值
     * @private
     */
    setLoadingBookMarksFail (state, value) {
      state.loadingBookMarksFail = !!value
    },
    /**
     * 设置书签列表
     * @param {Object} state catalogState
     * @param {Array<{chapterIndex: Number, chapterTitle: String}>} bookMarks 书签列表
     * @private
     */
    setBookMarks (state, bookMarks) {
      state.bookMarks = [...bookMarks]
    }
  },
  actions: {
    /**
     * 加载小说章节目录
     */
    async loadingCatalogChapters ({ commit }) {
      commit('setIsLoadingCatalogChapters', true)
      commit('setLoadingCatalogChaptersFail', false)
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        const { data } = await api.getNovelChapterData(domain, novelName, authorName)
        if (!data.length) {
          throw Error('empty novel chapter')
        }
        commit('setCatalogChapters', data)
      } catch (e) {
        console.log('[ERROR] initCatalogChapters', e)
        commit('setLoadingCatalogChaptersFail', true)
      }
      commit('setIsLoadingCatalogChapters', false)
    },
    /**
     * 加载书签列表
     */
    loadingBookMarks ({ commit }) {
      commit('setIsLoadingBookMarks', true)
      commit('setLoadingBookMarksFail', false)
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        const bookMarks = window.__browserObject.getBookMarks(domain, novelName, authorName)
        commit('setBookMarks', bookMarks)
      } catch (e) {
        console.log('[ERROR] loadingBookMarks', e)
        commit('setLoadingBookMarksFail', true)
      }
      commit('setIsLoadingBookMarks', false)
    }
  }
}

export default store
