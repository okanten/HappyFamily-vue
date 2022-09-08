import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { Mutations, mutations } from '@/store/mutations'

export interface State {
  defaultValue: string,
  gameId: string,
  gameIdPassword: string,
  hasSubmittedWord: boolean,
  hasLockedGame: boolean,
  submittedWords: Array<string>,
  instanceUrl: string,
  apiUrl: string,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    defaultValue: 'loading...',
    gameId: '',
    gameIdPassword: '',
    hasSubmittedWord: false,
    hasLockedGame: false,
    submittedWords: [],
    instanceUrl: 'https://rusa.no/',
    apiUrl: 'https://api.rusa.no'
  },
  mutations,
})


/*

export type Store = Omit<VuexStore<any>, "commit"> & {
 commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
   key: K,
   payload: P,
   options?: CommitOptions
 ): ReturnType<Mutations[K]>;
};

*/

/*
const store = createStore({
  state() {
    return {
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
*/