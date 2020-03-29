import { api } from './../../apis/api'

/**
 * 将当前来源房子啊小说来源列表首位
 * @param {String} presentDomain 当前来源域名
 * @param {Array<{ siteName: String, domain: String }>} novelSources 小说来源列表
 * @returns {Array<{ siteName: String, domain: String }>} 将当前来源域名放在首位的小说来源列表
 */
function putPresentNovelSourceFirst (presentDomain, novelSources) {
  let index = 0
  const novelSourceCount = novelSources.length
  while (index < novelSourceCount) {
    if (novelSources[index].domain === presentDomain) {
      break
    }
    index++
  }
  if (index < novelSourceCount) {
    let presentNovelSource = novelSources.splice(index, 1)[0]
    novelSources.unshift(presentNovelSource)
  }
  return novelSources
}

/**
 * 小说来源 store
 */
const store = {
  state: {
    isLoadingNovelSources: true,
    loadNovelSourcesFail: false,
    isChangingSource: false,
    novelSources: [],
    presentNovelSourceIndex: -1,
    usedNovelSources: []
  },
  mutations: {
    /**
     * 设置正在加载小说来源列表
     * @param {Object} state novelSource.state
     * @param {Boolean} value 值
     * @private
     */
    setIsLoadingNovelSources (state, value) {
      state.isLoadingNovelSources = value
    },
    /**
     * 设置加载小说来源列表失败
     * @param {Object} state novelSource.state
     * @param {Boolean} value 值
     * @private
     */
    setLoadNovelSourcesFail (state, value) {
      state.loadNovelSourcesFail = value
    },
    /**
     * 设置正在换源
     * @param {Object} state novelSource.state
     * @param {Boolean} value 值
     * @private
     */
    setIsChangingSource (state, value) {
      state.isChangingSource = value
    },
    /**
     * 设置小说来源列表
     * @param {Object} state novelSource.state
     * @param {Array<{ siteName: String, domain: String }>} novelSources 小说来源列表
     * @private
     */
    setNovelSources (state, novelSources) {
      state.novelSources = [...novelSources]
    },
    /**
     * 设置当前小说来源索引
     * @param {Object} state novelSource.state
     * @param {Number} index 索引
     * @private
     */
    setPresentNovelSourceIndex (state, index) {
      state.presentNovelSourceIndex = index
    },
    /**
     * 设置小说来源已使用
     * @param {Object} state novelSource.state
     * @param {Number} index 索引
     * @private
     */
    setNovelSourceUsed (state, index) {
      state.usedNovelSources[index] = true
      state.usedNovelSources = [...state.usedNovelSources]
    }
  },
  actions: {
    /**
     * 换源
     * - 更新正文内容
     * - 更新章节目录
     * - 更新书签列表
     * @param {Number} index 索引
     * @return {Promise<Boolean>} 换源结果
     * @throws 换源失败
     */
    async changeSource ({ dispatch, commit, state }, index) {
      commit('setIsChangingSource', true)
      const domain = state.novelSources[index].domain
      try {
        const [mainBody, catalogChapters, bookmarks] = await Promise.all([
          dispatch('loadMainBodyContentChangeSource', domain),
          dispatch('loadCatalogChaptersChangeSource', domain),
          dispatch('loadBookmarksChangeSource', domain)
        ])
        commit('setMainBody', mainBody.data)
        commit('setCatalogChapters', catalogChapters.data)
        commit('setBookmarks', bookmarks)
        commit('setDomain', domain)
        commit('setPresentNovelSourceIndex', index)
        commit('updateReadingChapterIsBookmarked')
        commit('setNovelSourceUsed', index)
        commit('setIsChangingSource', false)
        return Promise.resolve(true)
      } catch (e) {
        commit('setNovelSourceUsed', index)
        commit('setIsChangingSource', false)
        return Promise.reject(e)
      }
    },
    /**
     * 加载小说来源列表
     */
    async loadNovelSources ({ commit }) {
      commit('setIsLoadingNovelSources', true)
      commit('setLoadNovelSourcesFail', false)
      try {
        const {
          domain,
          novelName,
          authorName
        } = this.state
        const { data } = await api.getNovelSources(novelName, authorName)
        const novelSources = putPresentNovelSourceFirst(domain, data)
        if (novelSources[0].domain === domain) {
          commit('setPresentNovelSourceIndex', 0)
          commit('setNovelSourceUsed', 0)
        }
        commit('setNovelSources', novelSources)
      } catch (e) {
        console.log('[ERROR] loadNovelSources ', e)
        commit('setLoadNovelSourcesFail', true)
      }
      commit('setIsLoadingNovelSources', false)
    }
  }
}

export default store
