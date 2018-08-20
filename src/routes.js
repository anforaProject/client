import Vue from 'vue'
import VueRouter from 'vue-router'

import UserBase from './components/userProfile/UserBase.vue'
import UserPhotos from './components/userProfile/UserPhotos.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import LandingPage from './components/LandingPage.vue'
import Home from './components/Home.vue'
import Main from './components/layouts/mainLayout.vue'
import Upload from './components/UploadPicture.vue'
import Settings from './components/Settings.vue'
import {requireAuth} from './utils/auth'
import Followers from './components/userProfile/Followers.vue'
import Following from './components/userProfile/Following.vue'
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
      path: '',
      component: Main,
      children: 
      [
        {
          path: '/accounts/:id',
          component: UserBase,
          props: true,
          children: [
            {
              path: '/accounts/:id/followers',
              name: 'profile/followers',
              component: Followers
            },
            {
              path: '/accounts/:id/following',
              name: 'profile/following',
              component: Following
            },
            {
              path: '',
              name: 'profile',
              component: UserPhotos
            }
          ]
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
          path: '/home',
          name: 'home',
          component: Vue.component('Home', Home),
          beforeEnter: requireAuth
        },
        {
          path:'/upload',
          name:'upload',
          component: Upload,
          beforeEnter: requireAuth
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings,
        },
        {
          path: '/',
          name: 'landing',
          component: Vue.component('Landing', LandingPage)
        }
      ]
    }
  ]
});
