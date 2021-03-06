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
  function createBookmarkKey (domain, novelName, authorName) {
    const bookmarkKeyHeader = '__browserObject-bookmark'
    return `${bookmarkKeyHeader}-${domain}-${novelName}-${authorName}`
  }
  /** 移动端硬件属性数据存储键 */
  const deviceDataKey = '__browserObject-DeviceData'
  /** 移动端硬件属性默认数据 */
  const defaultDeviceData = {
    battery: 100,
    brightness: 100,
    browserVersion: 1,
    volumeKeySupport: true
  }
  /** 用户自定义设置存储键 */
  const userConfigKey = '__browserObject-userConfig'
  const {
    readerModeUpDown,
    defaultFontSize,
    defaultRowSpace,
    defaultBackgroundColor
  } = require('./../utils/consts')
  /** 用户自定义默认设置 */
  const defultUserConfig = {
    volumeKeyOn: false,
    nightMode: false,
    readerMode: readerModeUpDown,
    fontSize: defaultFontSize,
    rowSpace: defaultRowSpace,
    backgroundColor: defaultBackgroundColor
  }
  /** 已显示引导存储键 */
  const guideShowedKey = '__browserObject-guideShowed'
  /** 已加入书架存储键 */
  const bookshelfKey = '__browserObject-bookshelf'
  window.__browserObject = {
    /**
     * 是否已加入书架
     * @param {String} novelName 小说名
     * @param {String} authorName 作者名
     * @param {Boolean} 结果
     */
    isAddedBookshelf (novelName, authorName) {
      let bookshelf = localStorage.getItem(bookshelfKey)
      if (bookshelf) {
        bookshelf = JSON.parse(bookshelf)
      } else {
        bookshelf = []
      }
      for (let book of bookshelf) {
        if (book.novelName === novelName && book.authorName === authorName) {
          return true
        }
      }
      return false
    },
    /**
     * 加入书架
     * @param {String} novelName 小说名
     * @param {String} authorName 作者名
     * @param {Boolean} 结果
     */
    addBookshelf (novelName, authorName) {
      let bookshelf = localStorage.getItem(bookshelfKey)
      if (bookshelf) {
        bookshelf = JSON.parse(bookshelf)
      } else {
        bookshelf = []
      }
      bookshelf.push({
        novelName,
        authorName
      })
      localStorage.setItem(bookshelfKey, JSON.stringify(bookshelf))
      return true
    },
    /**
     * 是否已显示引导
     * @param {Boolean} 结果
     */
    isGuideShowed () {
      return localStorage.getItem(guideShowedKey)
    },
    /**
     * 设置已显示引导
     */
    setGuideShowed () {
      localStorage.setItem(guideShowedKey, true)
    },
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
     * @returns {Boolean} 结果
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
     * @param {String} bookId 小说id
     * @returns {Boolean} 结果
     */
    jumpToBookMall (bookId) {
      console.log(`[INFO] __browserObject jumpToBookMall bookId:${bookId}`)
      return true
    },
    /**
     * 跳转小说书架
     * @returns {Boolean} 结果
     */
    jumpToBookshelf () {
      console.log('[INFO] __browserObject jumpToBookshelf')
      return true
    },
    /**
     * 跳转广告页面
     * @param {String} adId 广告id
     * @returns {Boolean} 结果
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
     * @returns {Boolean} 结果
     */
    saveUserConfig (userConfig) {
      localStorage.setItem(userConfigKey, JSON.stringify({...defultUserConfig, ...userConfig}))
      return true
    },
    /**
     * 检查是否已加入书签
     * @param {String} domain 域名
     * @param {String} novelName 小说名
     * @param {String} authorName 作者名
     * @param {Number} chapterIndex 章节索引 （从0开始的数字）
     */
    isBookmarked (domain, novelName, authorName, chapterIndex) {
      let bookmarks = this.getBookmarks(domain, novelName, authorName)
      let bookmarkCount = bookmarks.length
      for (let i = 0; i < bookmarkCount; i++) {
        if (bookmarks[i].chapterIndex === chapterIndex) {
          return true
        }
      }
      return false
    },
    /**
     * 添加书签
     * @param {String} domain 域名
     * @param {String} novelName 小说名
     * @param {String} authorName 作者名
     * @param {Number} chapterIndex 章节索引 （从0开始的数字）
     * @param {String} chapterTitle 小说章节名
     * @returns {Boolean} 结果
     */
    addBookmark (domain, novelName, authorName, chapterIndex, chapterTitle) {
      if (!chapterTitle) {
        return false
      }
      let bookmarks = this.getBookmarks(domain, novelName, authorName)
      let bookmarkCount = bookmarks.length
      for (let i = 0; i < bookmarkCount; i++) {
        if (bookmarks[i].chapterIndex === chapterIndex) {
          return false
        }
      }
      bookmarks.push({ chapterIndex, chapterTitle })
      const key = createBookmarkKey(domain, novelName, authorName)
      localStorage.setItem(key, JSON.stringify(bookmarks))
      return true
    },
    /**
     * 删除书签
     * @param {String} domain 域名
     * @param {String} novelName 小说名
     * @param {String} authorName 作者名
     * @param {Number} chapterIndex 章节索引 （从0开始的数字）
     * @returns {Boolean} 结果
     */
    removeBookmark (domain, novelName, authorName, chapterIndex) {
      let bookmarks = this.getBookmarks(domain, novelName, authorName)
      let bookmarkCount = bookmarks.length
      for (let i = 0; i < bookmarkCount; i++) {
        if (bookmarks[i].chapterIndex === chapterIndex) {
          bookmarks.splice(i, 1)
          const key = createBookmarkKey(domain, novelName, authorName)
          localStorage.setItem(key, JSON.stringify(bookmarks))
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
    getBookmarks (domain, novelName, authorName) {
      const key = createBookmarkKey(domain, novelName, authorName)
      const bookMatksStr = localStorage.getItem(key)
      if (bookMatksStr) {
        return JSON.parse(bookMatksStr)
      }
      return []
    },
    /**
     * 退出阅读模式
     * @returns {Boolean} 结果
     */
    async exitReaderMode () {
      console.log('[INFO] __browserObject exitReaderMode')
      const store = require('./../stores/store.js').default
      try {
        await store.dispatch('saveUserConfig')
        return true
      } catch (e) {
        console.log('[ERROR] exitReaderMode ', e)
        return false
      }
    },
    ...window.__browserObject
  }
}())
