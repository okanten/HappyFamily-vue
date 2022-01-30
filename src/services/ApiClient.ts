import http from './http-common';

class ApiClient {
 
  createGame(): Promise<any> {
    return http.get("/create")
  }
  
  getWords(gameId: string, data: Object): Promise<any> {
    return http.post(`/game/${gameId}/words`, data)
  }
  
  openGame(gameId: string, data: Object) : Promise<any> {
    return http.post(`/game/${gameId}/open`, data)
  }

  closeGame(gameId: string, data: Object) : Promise<any> {
    return http.post(`/game/${gameId}/close`, data)
  }

  submitWord(gameId: string, data: Object) : Promise<any> {
    return http.post(`/game/${gameId}/add`, data)
  }
  
}

export default new ApiClient()