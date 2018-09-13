import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store.js';

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
import Terms from './components/legal/terms.vue'
import More from './components/legal/more.vue'

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
      path: '/',
      name: 'landing',
      component: Vue.component('Landing', LandingPage)
    },
    {
      path: '/more',
      name: 'more',
      component: Vue.component('More', More)
    },
    {
      path: '/terms',
      name: 'terms',
      component: Vue.component('Terms', Terms)
    },
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
          component: Vue.component('Login', Login),
          beforeEnter: (to, from, next) => {
            if(store.getters['profiles/currentAccount'] !== null){
              next('/home')
            }
            next()
          }
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
        }
      ]
    }
  ]
});
