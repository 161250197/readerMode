;
(function () {
  /**
   * 生成书签列表key
   * @param {String} domain 域名
   * @param {String} novelName 小说名
   * @param {String} authorName 作者名
   * @returns {String} 书签列表key
   * @private
   */
  function createBookMarkKey (domain, novelName, authorName) {
    const bookMarkKeyHeader = '__browserObject-bookMark'
    return `${bookMarkKeyHeader}-${domain}-${novelName}-${authorName}`
  }
  if (window.__browserObject === undefined) {
    const deviceDataKey = '__browserObject-DeviceData'
    const defaultDeviceData = {
      battery: 100,
      brightness: 100,
      browserVersion: 1,
      volumeKeySupport: true
    }
    const userConfigKey = '__browserObject-userConfig'
    const defultUserConfig = {
      volumeKeyOn: true,
      nightMode: false,
      readerMode: 'upDown',
      fontSizeIndex: 1,
      rowSpaceIndex: 1,
      backgroundColor: '#ffffff'
    }
    window.__browserObject = {
      /**
       * 获取移动端硬件属性数据
       * @returns {defaultDeviceData} 移动端硬件属性数据
       */
      getDeviceData () {
        let deviceDataStr = localStorage.getItem(deviceDataKey)
        if (deviceDataStr) {
          return JSON.parse(deviceDataStr)
        }
        return defaultDeviceData
      },
      /**
       * 设置移动端硬件亮度
       * @param {Number} brightness 移动端硬件亮度
       * @returns {Boolean} 设置结果
       */
      setBrightness (brightness) {
        console.log(`[INFO] __browserObject setBrightness brightness:${brightness}`)

        let deviceDataStr = localStorage.getItem(deviceDataKey)
        let newDeviceData
        if (deviceDataStr) {
          newDeviceData = JSON.parse(deviceDataStr)
        } else {
          newDeviceData = {...defaultDeviceData}
        }
        newDeviceData.brightness = brightness
        localStorage.setItem(deviceDataKey, JSON.stringify(newDeviceData))
        return true
      },
      /**
       * 跳转小说书城
       * @returns {Boolean} 设置结果
       */
      jumpToBookMall () {
        console.log('[INFO] __browserObject jumpToBookMall')
        return true
      },
      /**
       * 跳转广告页面
       * @param {String} adId 广告id
       * @returns {Boolean} 设置结果
       */
      jumpToAdPage (adId) {
        console.log(`[INFO] __browserObject jumpToAdPage adId:${adId}`)
        return true
      },
      /**
       * 获取用户自定义设置
       * @returns {defultUserConfig} 用户自定义设置
       */
      getUserConfig () {
        let userConfigStr = localStorage.getItem(userConfigKey)
        if (userConfigStr) {
          return JSON.parse(userConfigStr)
        }
        return defultUserConfig
      },
      /**
       * 保存用户自定义设置
       * @param {defultUserConfig} userConfig 用户自定义设置
       * @returns {Boolean} 保存结果
       */
      saveDeviceData (userConfig) {
        localStorage.setItem(userConfigKey, JSON.stringify({...defultUserConfig, ...userConfig}))
        return true
      },
      /**
       * 添加书签
       * @param {String} domain 域名
       * @param {String} novelName 小说名
       * @param {String} authorName 作者名
       * @param {Number} chapterIndex 章节索引 （从0开始的数字）
       * @param {String} chapterTitle 小说章节名
       * @returns {Boolean} 添加结果
       */
      addBookMark (domain, novelName, authorName, chapterIndex, chapterTitle) {
        let bookMarks = this.getBookMarks(domain, novelName, authorName)
        let bookMarkCount = bookMarks.length
        for (let i = 0; i < bookMarkCount; i++) {
          if (bookMarks[i].chapterIndex === chapterIndex) {
            return false
          }
        }
        bookMarks.push({chapterIndex, chapterTitle})
        const key = createBookMarkKey(domain, novelName, authorName)
        localStorage.setItem(key, JSON.stringify(bookMarks))
        return true
      },
      /**
       * 删除书签
       * @param {String} domain 域名
       * @param {String} novelName 小说名
       * @param {String} authorName 作者名
       * @param {Number} chapterIndex 章节索引 （从0开始的数字）
       * @returns {Boolean} 删除结果
       */
      removeBookMark (domain, novelName, authorName, chapterIndex) {
        let bookMarks = this.getBookMarks(domain, novelName, authorName)
        let bookMarkCount = bookMarks.length
        for (let i = 0; i < bookMarkCount; i++) {
          if (bookMarks[i].chapterIndex === chapterIndex) {
            bookMarks.splice(i, 1)
            const key = createBookMarkKey(domain, novelName, authorName)
            localStorage.setItem(key, JSON.stringify(bookMarks))
            return true
          }
        }
        return false
      },
      /**
       * 获取书签列表
       * @param {String} domain 域名
       * @param {String} novelName 小说名
       * @param {String} authorName 作者名
       * @returns {Array<{chapterIndex: Number, chapterTitle: String}>} 书签列表
       */
      getBookMarks (domain, novelName, authorName) {
        const key = createBookMarkKey(domain, novelName, authorName)
        const bookMatksStr = localStorage.getItem(key)
        if (bookMatksStr) {
          return JSON.parse(bookMatksStr)
        }
        return []
      },
      /**
       * 退出阅读模式
       * @returns {Boolean} 退出结果
       */
      exitReaderMode () {
        console.log('[INFO] __browserObject exitReaderMode')
        return true
      }
    }
  }
}())
