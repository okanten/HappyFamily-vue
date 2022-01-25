import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      defaultValue: 'loading...',
      gameId: null,
      gameIdPassword: null,
      instanceUrl: 'http://localhost:8080/',
      apiUrl: 'http://localhost:8000'
    }
  },
  mutations: {
    setGameId(state, newValue) {
      state.gameId = newValue
    },

    setGamePassword(state, newValue) {
      state.gameIdPassword = newValue
    }
  }
})

export default store
