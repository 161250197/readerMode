const readerModeUpDown = 'upDown'
const readerModeLeftRight = 'LeftRight'
const fontSizeCount = 4
const rowSpaceCount = 3

const store = {
  state: {
    volumeKeyOn: true,
    nightMode: false,
    readerMode: 'upDown',
    fontSizeIndex: 1,
    rowSpaceIndex: 1,
    backgroundColor: '#ffffff'
  },
  mutations: {
    /**
     * 设置音量键翻页功能开启
     * @param {Object} state userConfigState
     * @param {Boolean} value 值
     */
    setVolumeKeyOn (state, value) {
      state.volumeKeyOn = !!value
    },
    /**
     * 设置夜间模式开启
     * @param {Object} state userConfigState
     * @param {Boolean} value 值
     */
    setNightMode (state, value) {
      state.nightMode = !!value
    },
    /**
     * 设置阅读模式
     * @param {Object} state userConfigState
     * @param {String} value 阅读模式
     */
    setReaderMode (state, value) {
      if (value === readerModeUpDown || value === readerModeLeftRight) {
        state.readerMode = value
      } else {
        console.log(`[ERROR] setReaderMode wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文字体大小索引
     * @param {Object} state userConfigState
     * @param {Number} value 正文字体大小索引
     */
    setFontSizeIndex (state, value) {
      if (value >= 0 && value < fontSizeCount) {
        state.fontSizeIndex = value
      } else {
        console.log(`[ERROR] setFontSizeIndex wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容行间距大小索引
     * @param {Object} state userConfigState
     * @param {Number} value 正文内容行间距大小索引
     */
    setRowSpaceIndex (state, value) {
      if (value >= 0 && value < rowSpaceCount) {
        state.rowSpaceIndex = value
      } else {
        console.log(`[ERROR] setRowSpaceIndex wrongValue: ${value}`)
      }
    },
    /**
     * 设置正文内容页面背景色
     * @param {Object} state userConfigState
     * @param {String} value 正文内容页面背景色
     */
    setBackgroundColor (state, value) {
      if (/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?/.test(value)) {
        state.backgroundColor = value
      } else {
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
        fontSizeIndex,
        rowSpaceIndex,
        backgroundColor
      } = userConfig
      commit('setVolumeKeyOn', volumeKeyOn)
      commit('setNightMode', nightMode)
      commit('setReaderMode', readerMode)
      commit('setFontSizeIndex', fontSizeIndex)
      commit('setRowSpaceIndex', rowSpaceIndex)
      commit('setBackgroundColor', backgroundColor)
    },
    /**
     * 保存用户设置
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
      window.__browserObject.saveUserConfig({
        volumeKeyOn,
        nightMode,
        readerMode,
        fontSizeIndex,
        rowSpaceIndex,
        backgroundColor
      })
    }
  }
}

export default store
