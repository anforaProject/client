import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Profile from './modules/profiles'
import Relationship from './modules/accounts.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        profiles: Profile,
        relationships: Relationship
    },
    plugins: [createPersistedState()]
})
