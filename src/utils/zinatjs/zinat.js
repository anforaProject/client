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
          'Authorization': 'Basic ' + btoa(auth_info.username+':'+auth_info.password)
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

    var f = new FormData()

    f.append('public', data.public || true);
    f.append('message', data.caption || '');
    f.append('description', data.description || '');
    f.append('sensitive', data.sensitive || false);
    f.append('image', data.image);

    return axios({
        url: this.BASE_URL + urls.upload,
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Authorization': this.retriveToken(),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        data:f
    })
  }

  retriveImages(id){
    return axios({
      url: this.BASE_URL + urls.retriveImages(id),
      method: 'get',
      headers:{
        'Accept': 'application/json',
      }
    })
  }

  getHomeTimeline(){
    return axios({
      url: this.BASE_URL + urls.homeTimeline,
      method: 'get',
      headers:{
        'Accept': 'application/json',
        'Authorization': this.retriveToken(),
      }
    })
  }

  verifyCredentials(token){
    return axios({
      url: this.BASE_URL + urls.verifyCredentials,
      method: 'get',
      headers:{
        'Accept': 'application/json',
        'Authorization': token,
      }
    })
  }

}
