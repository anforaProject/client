import axios from 'axios';
import Router from 'vue-router';

const ACCESS_TOKEN_KEY = 'auth_token';

const CLIENT_DOMAIN = 'http://localhost:8000';
//const REDIRECT = 'http://localhost:8000/';

var router = new Router({
   mode: 'history',
});

export function login(auth_info) {
  axios.post(CLIENT_DOMAIN+'api/v1/auth',
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    {
      auth:{
        username: auth_info.username,
        password: auth_info.password
      }
  })
  .then(response =>{
    console.log(response)
    setAccessToken(response.token)
    router.push('/')
  })
  .catch(e => {
    console.log(e)
    return false
  })
}



export function logout() {
  clearAccessToken();
  router.go('/');
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}


export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Get and store access_token in local storage
export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function isLoggedIn() {
  const idToken = getAccessToken();
  return !!idToken;
}
