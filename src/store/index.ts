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
    setGameId(state: any, newValue: string) {
      state.gameId = newValue
    },

    setGamePassword(state: any, newValue: string) {
      state.gameIdPassword = newValue
    },
    
    setSubmittedWord(state: any, newValue: string) {
      state.hasSubmittedWord = newValue
    },

    
    setLockedGame(state: any, newValue: Boolean) {
      state.hasLockedGame = newValue
    },
    
    setSubmittedWords(state: any, newValue: Array<string>) {
      state.submittedWords = newValue
    }
  }
})

export default store
