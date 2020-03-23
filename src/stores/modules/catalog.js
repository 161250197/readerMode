import { api } from './../../apis/api'

/**
 * 目录 store
 */
const store = {
  state: {
    isLoadingCatalogChapters: true,
    loadingCatalogChaptersFail: false,
    catalogChapters: [],
    isLoadingBookmarks: true,
    loadingBookmarksFail: false,
    bookmarks: []
  },
  mutations: {
    /**
     * 设置正在加载章节目录
     * @param {Object} state catalog.state
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingCatalogChapters (state, value) {
      state.isLoadingCatalogChapters = value
    },
    /**
     * 设置加载章节目录失败
     * @param {Object} state catalog.state
     * @param {Boolean} value 值
     * @private
     */
    setLoadingCatalogChaptersFail (state, value) {
      state.loadingCatalogChaptersFail = value
    },
    /**
     * 设置章节目录
     * @param {Object} state catalog.state
     * @param {Array<String>} catalogChapters 章节目录
     * @private
     */
    setCatalogChapters (state, catalogChapters) {
      state.catalogChapters = [...catalogChapters]
    },
    /**
     * 设置正在加载书签列表
     * @param {Object} state catalog.state
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingBookmarks (state, value) {
      state.isLoadingBookmarks = value
    },
    /**
     * 设置加载书签列表失败
     * @param {Object} state catalog.state
     * @param {Boolean} value 值
     * @private
     */
    setLoadingBookmarksFail (state, value) {
      state.loadingBookmarksFail = value
    },
    /**
     * 设置书签列表
     * @param {Object} state catalog.state
     * @param {Array<{chapterIndex: Number, chapterTitle: String}>} bookmarks 书签列表
     * @private
     */
    setBookmarks (state, bookmarks) {
      state.bookmarks = [...bookmarks]
    }
  },
  actions: {
    /**
     * 加载小说章节目录
     */
    async loadCatalogChapters ({ commit }) {
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
    loadBookmarks ({ commit }) {
      commit('setIsLoadingBookmarks', true)
      commit('setLoadingBookmarksFail', false)
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        const bookmarks = window.__browserObject.getBookmarks(domain, novelName, authorName)
        commit('setBookmarks', bookmarks)
      } catch (e) {
        console.log('[ERROR] loadBookmarks', e)
        commit('setLoadingBookmarksFail', true)
      }
      commit('setIsLoadingBookmarks', false)
    }
  }
}

export default store
