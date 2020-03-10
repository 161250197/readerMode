import Vuex from 'vuex'
import userConfig from './modules/userConfig'

let store = new Vuex.Store({
  modules: {
    userConfig
  },
  actions: {
    setupStore ({ dispatch }) {
      dispatch('setupUserConfig')
    }
  }
})

export default store
