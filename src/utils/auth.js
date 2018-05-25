import axios from 'axios';
import Router from 'vue-router';

const ACCESS_TOKEN_KEY = 'auth_token';

const CLIENT_DOMAIN = 'http://localhost:8000';
//const REDIRECT = 'http://localhost:8000/';

var router = new Router({
   mode: 'history',
});

export function login(auth_info) {
  axios.get(CLIENT_DOMAIN+'/api/v1/auth',
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
    setAccessToken(response.data.token)
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

function clearAccessToken() {

  var token = getAccessToken()

  var config = {
    headers: {'Authorization': "bearer " + token}
  }

  var bodyParameters = {
   "token": token
  }

  axios.post(CLIENT_DOMAIN+'/logout',
    bodyParameters,
    config,
  )
  .then(response =>{
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  })
  .catch(e => {
    console.log(e)
    return false
  })

}

// Get and store access_token in local storage
export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function isLoggedIn() {
  const idToken = getAccessToken();
  return !!idToken;
}
