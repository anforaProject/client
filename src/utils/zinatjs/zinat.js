import axios from 'axios'
import urls from './urlMap.js'

export default class Zinat{
  constructor(url){
    this.BASE_URL = url
  }

  getAuthToken(auth_info){
    return axios({
        url: this.BASE_URL + urls.auth,
        method: 'get',
        auth:{
          username: auth_info.username,
          password: auth_info.password
        },
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
  }

  logout(token){
    var config = {
      headers: {'Authorization': token}
    }

    var bodyParameters = {
     "token": token
    }

    return axios.post(this.BASE_URL + urls.logout,
      bodyParameters,
      config,
    )
  }

}
