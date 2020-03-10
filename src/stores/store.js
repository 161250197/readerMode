import Vuex from 'vuex'
import state from './modules/state'
import userConfig from './modules/userConfig'

let store = new Vuex.Store({
  modules: {
    state,
    userConfig
  },
  actions: {
    setupStore ({ dispatch }) {
      dispatch('setupUserConfig')
    }
  }
})

export default store
