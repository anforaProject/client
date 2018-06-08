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

    return axios({
        url: this.BASE_URL + urls.upload,
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Authorization': this.retriveToken(),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        data:{
          "public": data.public || true,
          "message": data.message || '',
          "description": data.description || '',
          "sensitive": data.sensitive || false,
          "image": data.image
        }
    })
  }

  retriveImages(){
    console.log(urls.retriveImages('test'))
    return axios({
      url: this.BASE_URL + urls.retriveImages('test'),
      method: 'get',
      headers:{
        'Accept': 'application/json',
        'Authorization': this.retriveToken(),
      }
    })
  }



}
