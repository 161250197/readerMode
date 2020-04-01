;
(function () {
  window.__readerModeObject = {
    /**
     * 刷新正文内容位置
     * - 在 LeftDown.vue 和 UpDown.vue 中初始化
     */
    refreshMainBodyPosition () {
      console.log('[ERROR] __readerModeObject refreshMainBodyPosition not initialed')
    },
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
      const store = require('./../stores/store.js').default
      const {
        catalogChaptersShow,
        catalogBookmarksShow,
        deleteBookmarkShow,
        userMenuShow,
        rowHeightPromptShow,
        moreSettingShow
      } = store.state.showState
      if (deleteBookmarkShow) {
        store.commit('setDeleteBookmarkShow', false)
        return
      }
      if (catalogBookmarksShow) {
        store.commit('setCatalogBookmarksShow', false)
        return
      }
      if (catalogChaptersShow) {
        store.commit('setCatalogChaptersShow', false)
        return
      }
      if (userMenuShow) {
        store.commit('setUserMenuShow', false)
        return
      }
      if (rowHeightPromptShow) {
        store.commit('setRowHeightPromptShow', false)
        return
      }
      if (moreSettingShow) {
        store.commit('setMoreSettingShow', false)
        return
      }
      window.__browserObject.exitReaderMode()
    },
    ...window.__readerModeObject
  }
}())
