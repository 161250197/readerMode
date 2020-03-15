/**
 * 设备数据 store
 */
const store = {
  state: {
    deviceSize: {
      width: undefined,
      height: undefined
    },
    battery: 100,
    brightness: 100,
    browserVersion: 1,
    volumeKeySupport: false
  },
  mutations: {
    /**
     * 设置设备尺寸信息
     * @param {Object} state deviceData.state
     * @param {{ width: Number, height: Number }} deviceSize 尺寸信息
     */
    setDeviceSize (state, deviceSize) {
      const {
        width, height
      } = deviceSize
      state.deviceSize = {
        width,
        height
      }
    },
    /**
     * 设置电量信息
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     */
    setBattery (state, value) {
      state.battery = value
    },
    /**
     * 设置亮度信息
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     * @throws {Error} 设置亮度信息失败
     */
    setBrightness (state, value) {
      if (!window.__browserObject.setBrightness(value)) {
        throw Error('[ERROR] setBrightness fail')
      }
      state.brightness = value
    },
    /**
     * 设置浏览器版本
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     */
    setBrowserVersion (state, value) {
      state.browserVersion = value
    },
    /**
     * 设置是否支持音量键翻页
     * @param {Object} state deviceData.state
     * @param {Boolean} value 值
     */
    setVolumeKeySupport (state, value) {
      state.volumeKeySupport = !!value
    }
  },
  actions: {
    /**
     * 初始化设备数据
     */
    initDeviceData ({ commit }) {
      const {
        battery,
        brightness,
        browserVersion,
        volumeKeySupport
      } = window.__browserObject.getDeviceData()
      commit('setBattery', battery)
      commit('setBrightness', brightness)
      commit('setBrowserVersion', browserVersion)
      commit('setVolumeKeySupport', volumeKeySupport)
    }
  }
}

export default store
