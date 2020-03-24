import {
  readerModeUpDown,
  readerModeLeftRight,
  fontSizes,
  defaultFontSize,
  textIndents,
  defaultTextIndent,
  rowSpaces,
  rowSpacePrompts,
  defaultRowSpace,
  defaultRowSpacePrompt,
  backgroundColors,
  defaultBackgroundColor
} from './../../utils/consts.js'

/**
 * 用户设置 store
 */
const store = {
  state: {
    volumeKeyOn: false,
    nightMode: false,
    readerMode: readerModeUpDown,
    fontSize: defaultFontSize,
    textIndent: defaultTextIndent,
    rowSpace: defaultRowSpace,
    rowSpacePrompt: defaultRowSpacePrompt,
    backgroundColor: defaultBackgroundColor
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
     */
    setReaderMode (state, value) {
      if (value === readerModeUpDown || value === readerModeLeftRight) {
        state.readerMode = value
      } else {
        state.readerMode = readerModeUpDown
        console.log(`[ERROR] setReaderMode wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文字体大小
     * @param {Object} state userConfig.state
     * @param {String} value 正文字体大小
     */
    setFontSize (state, value) {
      const index = fontSizes.indexOf(value)
      if (index >= 0) {
        state.fontSize = value
        state.textIndent = textIndents[index]
      } else {
        state.fontSize = defaultFontSize
        state.textIndent = defaultTextIndent
        console.log(`[ERROR] setFontSize wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容行间距大小
     * @param {Object} state userConfig.state
     * @param {String} value 正文内容行间距大小
     */
    setRowSpace (state, value) {
      const index = rowSpaces.indexOf(value)
      if (index >= 0) {
        state.rowSpace = value
        state.rowSpacePrompt = rowSpacePrompts[index]
      } else {
        state.rowSpace = defaultRowSpace
        state.rowSpacePrompt = defaultRowSpacePrompt
        console.log(`[ERROR] setRowSpace wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容页面背景色
     * @param {Object} state userConfig.state
     * @param {String} value 正文内容页面背景色
     */
    setBackgroundColor (state, value) {
      if (backgroundColors.indexOf(value) >= 0) {
        state.backgroundColor = value
      } else {
        state.backgroundColor = defaultBackgroundColor
        console.log(`[ERROR] setBackgroundColor wrongValue: ${value}`)
      }
    }
  },
  actions: {
    /**
     * 初始化用户设置
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
      commit('setReaderMode', readerMode)
      commit('setFontSize', fontSize)
      commit('setRowSpace', rowSpace)
      commit('setBackgroundColor', backgroundColor)
      commit('setVolumeKeyOn', volumeKeyOn)
      commit('setNightMode', nightMode)
    },
    /**
     * 保存用户设置
     * @throws 保存用户设置失败
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
