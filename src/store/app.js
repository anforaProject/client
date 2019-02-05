import Theme from '../constants/theme.js'

const App = {
    namespaced: true,
    state:{
        theme: Theme.RedMoon.key,
        notify:{
            reply: true,
            reblog: true, 
            favourite: true, 
            follow: true
        },
        ignoreCW: false
    },
    mutations:{
        updateTheme(state, themeColorList){
            state.theme = themeColorList
        }
    },
    actions:{
        updateTheme({commit}, appearence){
            const themeKey = appearence.key 
            commit('updateTheme', themeKey)

        }
    },
    getters:{
        getTheme(state){
            return state.theme
        }
    }
}

export default App;