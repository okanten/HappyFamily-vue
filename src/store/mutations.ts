import { MutationTree } from "vuex"

export enum MutationType {
  SetGameId = "SET_GAME_ID",
  SetGamePassword = "SET_GAME_PASSWORD",
  SetSubmittedWord = "SET_SUBMITTED_WORD",
  SetLockedGame = "SET_LOCKED_GAME",
  SetSubmittedWords = "SET_SUBMITTED_WORDS",
}

export type Mutations = {
  [MutationType.SetGameId](state: any, newValue: string): void;
  [MutationType.SetGamePassword](state: any, newValue: string): void;
  [MutationType.SetSubmittedWord](state: any, newValue: Boolean): void;
  [MutationType.SetLockedGame](state: any, newValue: Boolean): void;
  [MutationType.SetSubmittedWords](state: any, newValue: Array<string>): void;
}

export const mutations: MutationTree<any> & Mutations = {
  [MutationType.SetGameId](state, newValue) {
    state.gameId = newValue
  },

  [MutationType.SetGamePassword](state, newValue) {
    state.gameIdPassword = newValue
  },

  [MutationType.SetSubmittedWord](state, newValue) {
    state.hasSubmittedWord = newValue
  },


  [MutationType.SetLockedGame](state, newValue) {
    state.hasLockedGame = newValue
  },

  [MutationType.SetSubmittedWords](state, newValue) {
    state.submittedWords = newValue
  }
}