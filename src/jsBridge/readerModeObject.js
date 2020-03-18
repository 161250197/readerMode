;
(function () {
  window.__readerModeObject = {
    /**
     * 翻至下一页
     * - 在 MainBody.vue 中初始化
     */
    goNextPage () {
      console.log('[ERROR] __readerModeObject goNextPage not initialed')
    },
    /**
     * 翻至上一页
     * - 在 MainBody.vue 中初始化
     */
    goPrevPage () {
      console.log('[ERROR] __readerModeObject goPrevPage not initialed')
    },
    /**
     * back键回调
     */
    onBack () {
      console.log('[INFO] __readerModeObject goPrevPage')
    },
    ...window.__readerModeObject
  }
}())
