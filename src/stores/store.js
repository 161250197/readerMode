import Vuex from 'vuex'
import catalog from './modules/catalog'
import mainBody from './modules/mainBody'
import showState from './modules/showState'
import userConfig from './modules/userConfig'
import { api } from './../apis/api'

let store = new Vuex.Store({
  modules: {
    catalog,
    mainBody,
    showState,
    userConfig
  },
  state: {
    domain: '',
    novelName: '',
    authorName: '',
    chapterIndex: 0
  },
  mutations: {
    /**
     * 设置小说名
     * @param {Object} state storeState
     * @param {String} novelName 小说名
     */
    setNovelName (state, novelName) {
      state.novelName = novelName
    },
    /**
     * 设置作者名
     * @param {Object} state storeState
     * @param {String} authorName 作者名
     */
    setAuthorName (state, authorName) {
      state.authorName = authorName
    },
    /**
     * 设置章节索引
     * @param {Object} state storeState
     * @param {Number} chapterIndex 章节索引
     */
    setChapterIndex (state, chapterIndex) {
      state.chapterIndex = chapterIndex
    },
    /**
     * 设置域名
     * @param {Object} state storeState
     * @param {String} domain 域名
     */
    setDomain (state, domain) {
      state.domain = domain
    }
  },
  actions: {
    /**
     * 初始化 store
     */
    initStore ({ dispatch, commit }) {
      Promise.all([
        // 初始化用户设置
        dispatch('setupUserConfig'),
        // 更新域名信息
        dispatch('updateDomain'),
        // 初始化小说参数
        dispatch('initNovelData')
      ])
        .then(() => {
          // 初始化小说内容
          dispatch('initNovelContents')
        })
        .catch(e => {
          console.log('[ERROR] initStore ', e)
          commit('setErrorShow', true)
          commit('setLoadingShow', false)
        })
    },
    /**
     * 更新域名信息
     * @throws {Error} 域名未匹配
     */
    updateDomain ({ commit }) {
      let href = document.location.href
      let domainMatch = href.match(/:\/\/([^/]+)/)
      if (!domainMatch) {
        throw Error(`domain not match href: ${href}`)
      }
      commit('setDomain', domainMatch[1])
    },
    /**
     * 初始化小说参数
     * @throws {Error} 请求失败
     */
    async initNovelData ({ commit }) {
      const url = document.location.href
      const { data } = await api.getNovelData(url)
      const {
        novelName,
        authorName,
        chapterIndex
      } = data
      commit('setNovelName', novelName)
      commit('setAuthorName', authorName)
      commit('setChapterIndex', chapterIndex)
    },
    /**
     * 初始化小说内容
     */
    initNovelContents ({ commit, dispatch }) {
      // 加载小说章节目录
      dispatch('loadingCatalogChapters')
      // 加载小说书签列表
      dispatch('loadingBookMarks')
      // 初始化小说正文内容
      dispatch('initMainBodyContent')
        .then(() => {
          commit('setLoadingShow', false)
        })
        .catch(e => {
          console.log('[ERROR] initNovelContents ', e)
          commit('setErrorShow', true)
          commit('setLoadingShow', false)
        })
    }
  }
})

export default store
