import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import store from './store/store.js'


router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0);
    next();
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')