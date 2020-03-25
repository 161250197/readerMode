import { api } from './../../apis/api'

/**
 * 广告 store
 */
const store = {
  state: {
    chapterAds: []
  },
  mutations: {
    /**
     * 设置章节广告
     * @param {Object} state mainBody.state
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
     * 初始化小说正文内容
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
