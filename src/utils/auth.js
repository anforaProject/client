import zinatAPI from './zinatjs/serverConnection.js'
import AccountsPersistant from '../store/persistant/persistantStore.js'
import store from '../store/store.js'

//const REDIRECT = 'http://localhost:8000/';

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

export function logout() {
  store.commit('profiles/logout')
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