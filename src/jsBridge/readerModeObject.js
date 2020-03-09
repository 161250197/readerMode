;
(function () {
  if (window.__readerModeObject === undefined) {
    window.__readerModeObject = {
      /**
       * 翻至下一页
       */
      goNextPage () {
        console.log('[INFO] __readerModeObject goNextPage')
      },
      /**
       * 翻至上一页
       */
      goPrevPage () {
        console.log('[INFO] __readerModeObject goPrevPage')
      },
      /**
       * back键回调
       */
      onBack () {
        console.log('[INFO] __readerModeObject goPrevPage')
      }
    }
  }
}())
