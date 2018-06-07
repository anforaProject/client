import axios from 'axios'
import urls from './urlMap.js'
import {getAccessToken} from '../auth.js'

export default class Zinat{
  constructor(url){
    this.BASE_URL = url
  }

  retriveToken(){
    return this.TOKEN || getAccessToken()
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
      headers: {'Authorization': this.retriveToken()}
    }

    var bodyParameters = {
     "token": token
    }

    return axios.post(this.BASE_URL + urls.logout,
      bodyParameters,
      config,
    )
  }

  uploadPicture(data){

    var config = {'Authorization': this.retriveToken()}

    var body = {
      "public": data.public || true,
      "message": data.message || '',
      "description": data.description || '',
      "sensitive": data.sensitive || false,
      "image": data.image
    }

    return axios.post(this.BASE_URL + urls.upload,
      body,
      config
    )
  }

  retriveImages(){
    var config = {'Authorization': this.retriveToken()}
    console.log(urls.retriveImages('test'))
    return axios.get(this.BASE_URL + urls.retriveImages('test'),
      {},
      config
    )
  }



}
