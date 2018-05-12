import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import UserProfile from './components/user.vue'



Vue.config.productionTip = false

const routes = [
  {path: '/@:username', component:UserProfile},
  {path: '/', component: App}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(UserProfile)
}).$mount('#app')
