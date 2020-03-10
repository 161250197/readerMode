const store = {
  state: {
    errorShow: false,
    loadingShow: true,
    userMenuShow: false,
    catalogShow: false,
    moreSettingShow: false
  },
  mutations: {
    /**
     * 设置错误页显示
     * @param {Object} state stateState
     * @param {Boolean} value 值
     */
    setErrorShow (state, value) {
      state.errorShow = !!value
    },
    /**
     * 设置 Loading 页显示
     * @param {Object} state stateState
     * @param {Boolean} value 值
     */
    setLoadingShow (state, value) {
      state.loadingShow = !!value
    },
    /**
     * 设置菜单项显示
     * @param {Object} state stateState
     * @param {Boolean} value 值
     */
    setUserMenuShow (state, value) {
      state.userMenuShow = !!value
    },
    /**
     * 设置目录页显示
     * @param {Object} state stateState
     * @param {Boolean} value 值
     */
    setCatalogShow (state, value) {
      state.catalogShow = !!value
    },
    /**
     * 设置更多设置页显示
     * @param {Object} state stateState
     * @param {Boolean} value 值
     */
    setMoreSettingShow (state, value) {
      state.moreSettingShow = !!value
    }
  }
}

export default store
