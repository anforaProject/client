import Router from 'vue-router';
import zinatAPI from './zinatjs/serverConnection.js'
import AccountsPersistant from '../store/persistant/persistantStore.js'
import store from '../store/store.js'

const ACCESS_TOKEN_KEY = 'auth_token';
//const REDIRECT = 'http://localhost:8000/';

var router = new Router({
   mode: 'history',
});


export function login(auth_info) {
  return new Promise(function(resolve, reject){
    zinatAPI.getAuthToken(auth_info)
    .then(response =>{
        
        //once we get the auth_token
        let access_token = response.data.token
        //get auth info
        zinatAPI.verifyCredentials(access_token).then(response=>{
          let account = response.data
          account.token = access_token
          store.commit('profiles/addAccount', account)
          resolve(account)
        })
        .catch(e => {
          console.log(e)
          reject(e)
          //Store the token somehow
        })
        
      })
  })
}

function clearAccessToken() {

  zinatAPI.logout(getAccessToken())
  .then(response =>{
    if(response){
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
  })
  .catch(e => {
    console.log(e)
    return false
  })

}

export function logout() {
  clearAccessToken();
  router.push('/');
}

export function requireAuth(to, from, next) {
  isLoggedIn().then(
    value =>{
      if (!value){
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }else{
        next()
      }
    }
  )
}

export function isLoggedIn(){
  return new Promise(function(resolve, reject){
    getAccessToken().then(token=>{
      let empty = token.lenght != 0
      resolve(empty)
    }).catch( e=>{
      reject(e)
    })
  })
}

export function getAccessToken() {
  return new Promise((resolve)=>{resolve("sad")})
}

export function getUser(){
  return new Promise(function(resolve, reject){
    let user = AccountsPersistant.retriveAccount(2)
    resolve(user)
    reject()
  })
}