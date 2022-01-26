import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      defaultValue: 'loading...',
      gameId: null,
      gameIdPassword: null,
      hasSubmittedWord: false,
      hasLockedGame: false,
      submittedWords: [],
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
    },
    
    setSubmittedWord(state, newValue) {
      state.hasSubmittedWord = newValue
    },

    
    setLockedGame(state, newValue) {
      state.hasLockedGame = newValue
    },
    
    setSubmittedWords(state, newValue) {
      state.submittedWords = newValue
    }
  }
})

export default store
