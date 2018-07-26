import Vue from 'vue'
import App from './App.vue'

//React Router
import router from './routes.js'

//Vuex moduke
import store from './store/store.js'

//Translations
import i18n from './translations/i18n.js'

//Css Bulma
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0);
    next();
});

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')