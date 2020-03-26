import { api } from './../../apis/api'

/**
 * 广告 store
 */
const store = {
  state: {
    recommendBooks: [],
    chapterAds: []
  },
  mutations: {
    /**
     * 设置推荐小说列表
     * @param {Object} state ad.state
     * @param {{bookId: String, cover: String, novelName: String}} recommendBooks 推荐小说列表
     */
    setRecommendBooks (state, recommendBooks) {
      state.recommendBooks = [...recommendBooks]
    },
    /**
     * 设置章节广告
     * @param {Object} state ad.state
     * @param {{index: Number, ad: {adId: String, picture: String, title: String, info: String}}} param1 章节广告
     * @private
     */
    setChapterAd (state, { index, ad }) {
      state.chapterAds[index] = ad
      state.chapterAds = [...state.chapterAds]
    }
  },
  actions: {
    /**
     * 加载推荐小说列表
     */
    async loadRecommendBooks ({ commit }) {
      try {
        const { bookId } = this.state
        const { data } = await api.getRecommendBooks(bookId)
        commit('setRecommendBooks', data)
      } catch (e) {
        console.log('[ERROR] loadRecommendBooks ', e)
      }
    },
    /**
     * 加载广告
     * @param {Number} index 章节索引 - 从0开始
     */
    async loadAd ({ commit }, index) {
      try {
        const { data } = await api.getAdData()
        commit('setChapterAd', { index, ad: data })
      } catch (e) {
        console.log('[ERROR] loadAd ', e)
      }
    }
  }
}

export default store
