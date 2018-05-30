import Vue from 'vue'
import VueRouter from 'vue-router'

import UserBase from './components/userProfile/UserBase.vue'
import UserPhotos from './components/userProfile/UserPhotos.vue'

import About from './components/About.vue'
import Login from './components/Login.vue'
import LandingPage from './components/LandingPage.vue'
import Home from './components/Home.vue'
import Upload from './components/UploadPicture.vue'
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
        component: UserBase,
        children:[{
          path: '',
          component: UserPhotos,
          name:'userProfile'
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
        path: '/',
        name: 'landing',
        component: Vue.component('Landing', LandingPage)
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
      }
    ]
});
