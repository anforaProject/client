import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0);
    next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
