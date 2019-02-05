import Vue from 'vue'
import App from './App.vue'

//React Router
import router from './routes.js'

//Vuex moduke
import store from './store/store.js'

import { sync } from 'vuex-router-sync'

//Translations
import i18n from './translations/i18n.js'

//Css Bulma
import Buefy from 'buefy'

//Validators
import VeeValidate from 'vee-validate';

router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0);
    next();
});

Vue.config.productionTip = false


Vue.use(Buefy)
sync(store, router) // done. Returns an unsync callback fn
Vue.use(VeeValidate);


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')