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
      config
    )
  }

  uploadStatus(data, token){

    var f = new FormData()

    f.append('public', data.visibility || true);
    f.append('status', data.status || '');
    f.append('sensitive', data.sensitive || false);
    f.append('media_ids', data.media_ids);

    return axios({
        url: this.BASE_URL + urls.uploadStatus,
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Authorization': token,
        },
        data:f
    })
  }

  uploadComment(data, token){
    var f = new FormData()

    f.append('public', data.visibility || true);
    f.append('status', data.status || '');
    f.append('sensitive', data.sensitive || false);
    f.append('spoiler_text', data.spoiler_text || '')
    f.append('in_reply_to_id', data.in_reply_to_id)

    return axios({
        url: this.BASE_URL + urls.uploadStatus,
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Authorization': token,
        },
        data:f
    })
  }

  uploadMedia(data, token){
    var f = new FormData()
    f.append('file', data.image)
    f.append('description', data.description || '')

    return axios({
          url: this.BASE_URL + urls.uploadMedia,
          method: 'post',
          headers:{
            'Accept': 'application/json',
            'Authorization': token,
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
          },
          data:f
        })
  }

  updateProfile(data, token){
    var f = new FormData()
    if(data.name){
      f.append('display_name', data.name)
    }

    if(data.note){
      f.append('note', data.note)
    }
    
    if(data.avatar){
      f.append('avatar', data.avatar)
    }
    
    if(data.locked !== undefined){
      f.append('locked', data.locked)
    }

    if(data.bot !== undefined){
      f.append('bot', data.bot)
    }

    return axios({
      url: this.BASE_URL + urls.updateCredentials,
      method: 'patch',
      headers:{
        'Accept': 'application/json',
        'Authorization': token,
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


  removeStatus(id, token){
    return axios({
      url: this.BASE_URL + urls.status(id),
      method: 'delete',
      headers:{
        'Accept': 'application/json',
        'Authorization': token,
      }
    })
  }

  likeStatus(id, token){
    return axios({
      url: this.BASE_URL + urls.likeStatus(id),
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Authorization': token,
      }
    })
  }

  dislikeStatus(id, token){
    return axios({
      url: this.BASE_URL + urls.dislikeStatus(id),
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Authorization': token,
      }
    })
  }

  retriveUser(id){
    return axios({
      url: this.BASE_URL + urls.retriveUser(id),
      method: 'get',
      headers:{
        'Accept': 'apllication/json'
      }
    })
  }

  getFollowers(id){
    return axios({
      url: this.BASE_URL + urls.followers(id),
      method: 'get',
      headers:{
        'Accept': 'apllication/json'
      }
    })
  }

  getFollowing(id){
    return axios({
      url: this.BASE_URL + urls.following(id),
      method: 'get',
      headers:{
        'Accept': 'apllication/json'
      }
    })
  }

  getHomeTimeline(token){
    return axios({
      url: this.BASE_URL + urls.homeTimeline,
      method: 'get',
      headers:{
        'Accept': 'application/json',
        'Authorization': token,
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

  registerUser(data){
    var f = new FormData()
    f.append('username', data.username)
    f.append('password', data.password)
    f.append('password_confirmation', data.password_confirmation)
    f.append('email', data.email)

    return axios({
          url: this.BASE_URL + urls.registerUser,
          method: 'post',
          headers:{
            'Accept': 'application/json',
          },
          data:f
        })
  }

}
