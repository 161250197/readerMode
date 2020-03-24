import { updateTimeAndBatteryIntervalTime } from './../../utils/consts.js'

/**
 * 设备数据 store
 */
const store = {
  state: {
    deviceSize: {
      width: undefined,
      height: undefined
    },
    updateTimeAndBatteryIntervalId: undefined,
    timeStr: '',
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
     * 设置亮度信息
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     * @throws 设置亮度信息失败
     */
    setBrightness (state, value) {
      if (!window.__browserObject.setBrightness(value)) {
        throw Error('[ERROR] setBrightness fail')
      }
      state.brightness = value
    },
    /**
     * 设置更新时间和电量信息的 interval id
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     * @private
     */
    setUpdateTimeAndBatteryIntervalId (state, value) {
      clearInterval(state.updateTimeAndBatteryIntervalId)
      state.updateTimeAndBatteryIntervalId = value
    },
    /**
     * 刷新当前时间
     * @param {Object} state deviceData.state
     * @private
     */
    updateTimeStr (state) {
      const now = new Date()
      let hours = `${now.getHours()}`
      if (hours.length === 1) {
        hours = '0' + hours
      }
      let minutes = `${now.getMinutes()}`
      if (minutes.length === 1) {
        minutes = '0' + minutes
      }
      state.timeStr = `${hours}:${minutes}`
    },
    /**
     * 设置电量信息
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     * @private
     */
    setBattery (state, value) {
      state.battery = value
    },
    /**
     * 设置浏览器版本
     * @param {Object} state deviceData.state
     * @param {Number} value 值
     * @private
     */
    setBrowserVersion (state, value) {
      state.browserVersion = value
    },
    /**
     * 设置是否支持音量键翻页
     * @param {Object} state deviceData.state
     * @param {Boolean} value 值
     * @private
     */
    setVolumeKeySupport (state, value) {
      state.volumeKeySupport = value
    }
  },
  actions: {
    /**
     * 初始化设备数据
     */
    initDeviceData ({ commit, dispatch }) {
      const {
        battery,
        brightness,
        browserVersion,
        volumeKeySupport
      } = window.__browserObject.getDeviceData()
      try {
        commit('setBrightness', brightness)
      } catch (e) {
        return Promise.reject(e)
      }
      dispatch('startUpdateBatteryAndTimeInterval')
      commit('updateTimeStr')
      commit('setBattery', battery)
      commit('setBrowserVersion', browserVersion)
      commit('setVolumeKeySupport', volumeKeySupport)
    },
    /**
     * 开始自动更新电量和当前时间信息
     */
    startUpdateBatteryAndTimeInterval ({ commit, dispatch }) {
      const id = setInterval(() => {
        dispatch('updateTimeAndBattery')
      }, updateTimeAndBatteryIntervalTime)
      commit('setUpdateTimeAndBatteryIntervalId', id)
    },
    /**
     * 停止自动更新电量和当前时间信息
     */
    stopUpdateBatteryAndTimeInterval ({ commit }) {
      commit('setUpdateTimeAndBatteryIntervalId', undefined)
    },
    /**
     * 刷新电量和时间
     * @private
     */
    updateTimeAndBattery ({ commit }) {
      const {
        battery
      } = window.__browserObject.getDeviceData()
      commit('updateTimeStr')
      commit('setBattery', battery)
    }
  }
}

export default store
