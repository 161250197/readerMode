import Vuex from 'vuex'

let store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
      console.log(state.count)
    }
  }
})

export default store
