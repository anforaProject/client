import Vue from 'vue'
import Vuex from 'vuex'
import Profile from './modules/profiles'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        profiles: Profile
    }
})
