import http from '@/services/http-common'

class Api {

  

  createGame() {
    return http.get("/create")
  }
  
  test() {
    return "test"
  }

}

export default new Api()