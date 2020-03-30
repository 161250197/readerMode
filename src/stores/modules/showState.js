/**
 * 显示 store
 */
const store = {
  state: {
    promptMessage: '',
    errorShow: false,
    loadingShow: true,
    catalogChaptersShow: false,
    catalogBookmarksShow: false,
    userMenuShow: false,
    settingShow: false,
    changeSourceShow: false,
    rowHeightPromptShow: false,
    moreSettingShow: false
  },
  mutations: {
    /**
     * 设置提示信息
     * @param {Object} state showState.state
     * @param {String} message 提示信息
     */
    setPromptMessage (state, message) {
      state.promptMessage = message
    },
    /**
     * 设置错误页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setErrorShow (state, value) {
      state.errorShow = value
    },
    /**
     * 设置 Loading 页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setLoadingShow (state, value) {
      state.loadingShow = value
    },
    /**
     * 设置目录章节页显示
     * - 目录章节页显示时自动关闭目录书签页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setCatalogChaptersShow (state, value) {
      state.catalogChaptersShow = value
      if (value) {
        this.commit('setCatalogBookmarksShow', false)
      }
    },
    /**
     * 设置目录书签页显示
     * - 目录书签页显示时自动关闭目录章节页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setCatalogBookmarksShow (state, value) {
      state.catalogBookmarksShow = value
      if (value) {
        this.commit('setCatalogChaptersShow', false)
      }
    },
    /**
     * 设置菜单项显示
     * - 菜单项关闭显示时，关闭设置页和换源页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setUserMenuShow (state, value) {
      state.userMenuShow = value
      if (!value) {
        state.settingShow = false
        state.changeSourceShow = false
      }
    },
    /**
     * 设置设置页显示
     * - 设置页显示时，关闭换源页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setSettingShow (state, value) {
      state.settingShow = value
      if (value) {
        state.changeSourceShow = false
      }
    },
    /**
     * 设置换源页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setChangeSourceShow (state, value) {
      state.changeSourceShow = value
    },
    /**
     * 设置行高选项弹窗显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setRowHeightPromptShow (state, value) {
      state.rowHeightPromptShow = value
    },
    /**
     * 设置更多设置页显示
     * @param {Object} state showState.state
     * @param {Boolean} value 值
     */
    setMoreSettingShow (state, value) {
      state.moreSettingShow = value
      if (value) {
        this.commit('setUserMenuShow', false)
      }
    }
  }
}

export default store
