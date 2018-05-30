import Router from 'vue-router';
import zinatAPI from './zinatjs/serverConnection.js'

const ACCESS_TOKEN_KEY = 'auth_token';
//const REDIRECT = 'http://localhost:8000/';

var router = new Router({
   mode: 'history',
});


export function login(auth_info) {
  zinatAPI.getAuthToken(auth_info)
  .then(response =>{
      setAccessToken(response.data.token)
      return true
  })
  .catch(e => {
    console.log(e)
    return false
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
  if (!isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}


export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// Get and store access_token in local storage
export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function isLoggedIn() {
  const idToken = getAccessToken();
  return !!idToken;
}
