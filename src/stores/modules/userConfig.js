import {
  readerModeUpDown,
  readerModeLeftRight,
  fontSizes,
  rowSpaces
} from './../../utils/consts.js'

/**
 * 用户设置 store
 */
const store = {
  state: {
    volumeKeyOn: false,
    nightMode: false,
    readerMode: 'upDown',
    fontSize: '0.8rem',
    rowSpace: '135%',
    backgroundColor: '#fff6e6'
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
     * 设置正文字体大小
     * @param {Object} state userConfig.state
     * @param {String} value 正文字体大小
     * @throws {Error} 正文字体大小值非法
     */
    setFontSize (state, value) {
      if (fontSizes.indexOf(value) >= 0) {
        state.fontSize = value
      } else {
        throw Error(`setFontSize wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容行间距大小
     * @param {Object} state userConfig.state
     * @param {String} value 正文内容行间距大小
     * @throws {Error} 正文内容行间距大小值非法
     */
    setRowSpace (state, value) {
      if (rowSpaces.indexOf(value) >= 0) {
        state.rowSpace = value
      } else {
        throw Error(`setRowSpace wrongValue: ${value}`)
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
        fontSize,
        rowSpace,
        backgroundColor
      } = userConfig
      try {
        commit('setReaderMode', readerMode)
        commit('setFontSize', fontSize)
        commit('setRowSpace', rowSpace)
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
        fontSize,
        rowSpace,
        backgroundColor
      } = state
      const saveSuccess = window.__browserObject.saveUserConfig({
        volumeKeyOn,
        nightMode,
        readerMode,
        fontSize,
        rowSpace,
        backgroundColor
      })
      if (!saveSuccess) {
        return Promise.reject(Error('save user config fail'))
      }
    }
  }
}

export default store
