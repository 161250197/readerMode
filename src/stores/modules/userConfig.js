import { readerModeUpDown, readerModeLeftRight, fontSizeCount, rowSpaceCount } from './../../utils/consts.js'

/**
 * 用户设置 store
 */
const store = {
  state: {
    volumeKeyOn: false,
    nightMode: false,
    readerMode: 'upDown',
    fontSizeIndex: 1,
    rowSpaceIndex: 1,
    backgroundColor: '#ffffff'
  },
  mutations: {
    /**
     * 设置音量键翻页功能开启
     * @param {Object} state userConfig.state
     * @param {Boolean} value 值
     */
    setVolumeKeyOn (state, value) {
      state.volumeKeyOn = value
    },
    /**
     * 设置夜间模式开启
     * @param {Object} state userConfig.state
     * @param {Boolean} value 值
     */
    setNightMode (state, value) {
      state.nightMode = value
    },
    /**
     * 设置阅读模式
     * @param {Object} state userConfig.state
     * @param {String} value 阅读模式
     * @throws {Error} 阅读模式值非法
     */
    setReaderMode (state, value) {
      if (value === readerModeUpDown || value === readerModeLeftRight) {
        state.readerMode = value
      } else {
        throw Error(`setReaderMode wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文字体大小索引
     * @param {Object} state userConfig.state
     * @param {Number} value 正文字体大小索引
     * @throws {Error} 正文字体大小索引值非法
     */
    setFontSizeIndex (state, value) {
      if (value >= 0 && value < fontSizeCount) {
        state.fontSizeIndex = value
      } else {
        throw Error(`setFontSizeIndex wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容行间距大小索引
     * @param {Object} state userConfig.state
     * @param {Number} value 正文内容行间距大小索引
     * @throws {Error} 正文内容行间距大小索引值非法
     */
    setRowSpaceIndex (state, value) {
      if (value >= 0 && value < rowSpaceCount) {
        state.rowSpaceIndex = value
      } else {
        throw Error(`setRowSpaceIndex wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容页面背景色
     * @param {Object} state userConfig.state
     * @param {String} value 正文内容页面背景色
     * @throws {Error} 正文内容页面背景色值非法
     */
    setBackgroundColor (state, value) {
      if (/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?/.test(value)) {
        state.backgroundColor = value
      } else {
        throw Error(`setBackgroundColor wrongValue: ${value}`)
      }
    }
  },
  actions: {
    /**
     * 初始化用户设置
     * @throws {Error} 用户设置值非法
     */
    setupUserConfig ({ commit }) {
      const userConfig = window.__browserObject.getUserConfig()
      const {
        volumeKeyOn,
        nightMode,
        readerMode,
        fontSizeIndex,
        rowSpaceIndex,
        backgroundColor
      } = userConfig
      try {
        commit('setReaderMode', readerMode)
        commit('setFontSizeIndex', fontSizeIndex)
        commit('setRowSpaceIndex', rowSpaceIndex)
        commit('setBackgroundColor', backgroundColor)
      } catch (e) {
        return Promise.reject(e)
      }
      commit('setVolumeKeyOn', volumeKeyOn)
      commit('setNightMode', nightMode)
    },
    /**
     * 保存用户设置
     * @throws {Error} 保存用户设置失败
     */
    saveUserConfig ({ state }) {
      const {
        volumeKeyOn,
        nightMode,
        readerMode,
        fontSizeIndex,
        rowSpaceIndex,
        backgroundColor
      } = state
      const saveSuccess = window.__browserObject.saveUserConfig({
        volumeKeyOn,
        nightMode,
        readerMode,
        fontSizeIndex,
        rowSpaceIndex,
        backgroundColor
      })
      if (!saveSuccess) {
        return Promise.reject(Error('save user config fail'))
      }
    }
  }
}

export default store
