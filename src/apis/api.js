import { instance } from '../utils/request'

const api = {
  /**
   * 获取广告数据
   * @param {String} adId 广告id
   * @returns {Promise}
   */
  getAdData (adId) {
    if (adId) {
      return instance.post('/getAdData', { adId })
    }
    return instance.post('/getAdData')
  },
  /**
   * 获取推荐小说列表
   * @param {String} bookId 小说id
   * @returns {Promise}
   */
  getRecommendBooks (bookId) {
    return instance.post('/getRecommendBooks', { bookId })
  },
  /**
   * 获取网络小说参数
   * @param {String} url 网络小说页面网址
   * @returns {Promise}
   */
  getNovelData (url) {
    return instance.post('/getNovelData', { url })
  },
  /**
   * 获取网络小说正文数据
   * @param {String} domain 域名
   * @param {String} novelName 小说名
   * @param {String} authorName 作者名
   * @param {Number} chapterIndex 章节索引 （从0开始的数字）
   * @returns {Promise}
   */
  getMainBodyText (domain, novelName, authorName, chapterIndex) {
    return instance.post('/getMainBodyText', { domain, novelName, authorName, chapterIndex })
  },
  /**
   * 获取网络小说章节数据
   * @param {String} domain 域名
   * @param {String} novelName 小说名
   * @param {String} authorName 作者名
   * @returns {Promise}
   */
  getNovelChapterData (domain, novelName, authorName) {
    return instance.post('/getNovelChapterData', { domain, novelName, authorName })
  },
  /**
   * 获取小说来源列表
   * @param {String} novelName 小说名
   * @param {String} authorName 作者名
   * @returns {Promise}
   */
  getNovelSources (novelName, authorName) {
    return instance.post('/getNovelSources', { novelName, authorName })
  }
}

export {
  api
}
