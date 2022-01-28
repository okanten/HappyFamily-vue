import http from './http-common';

class ApiClient {

  
  createGame() {
    return http.get("/create")
  }
  
  getWords(gameId, data) {
    return http.post(`/game/${gameId}/words`, data)
  }
  
  openGame(gameId, data) {
    return http.post(`/game/${gameId}/open`, data)
  }

  closeGame(gameId, data) {
    return http.post(`/game/${gameId}/close`, data)
  }

  submitWord(gameId, data) {
    return http.post(`/game/${gameId}/add`, data)
  }
  
}

export default new ApiClient()