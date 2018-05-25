import Vue from 'vue'
import VueRouter from 'vue-router'

import UserProfile from './components/User.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import LandingPage from './components/LandingPage.vue'
import Home from './components/Home.vue'

import {requireAuth} from './utils/auth'
/*
    Extends Vue to use Vue Router
*/
Vue.use( VueRouter )

/*
    Makes a new VueRouter that we will use to run all of the routes
    for the app.
*/
export default new VueRouter({
  mode: 'history',
  routes: [
      {
        path: '/@:username',
        name: 'username',
        component: Vue.component( 'UserProfile', UserProfile ),
      },
      {
        path: '/about',
        name: 'about',
        component: Vue.component( 'About', About ),
        meta: { requiresAuth: false }
      },
      {
        path: '/login',
        name: 'login',
        component: Vue.component('Login', Login)
      },
      {
        path: '/',
        name: 'landing',
        component: Vue.component('Landing', LandingPage)
      },
      {
        path: '/home',
        name: 'home',
        component: Vue.component('Home', Home),
        beforeEnter: requireAuth
      }
    ]
});
