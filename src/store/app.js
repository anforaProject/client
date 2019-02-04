import {LightTheme, DarkTheme} from '../utils/theme.js'

import Theme from '../constants/theme.js'

const App = {
    namespaced: true,
    state:{
        theme: DarkTheme,
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
            switch (themeKey){
                case Theme.Light.key:
                    commit('updateTheme', LightTheme)
                    break 
                case Theme.Dark.key:
                    commit('updateTheme', DarkTheme)
                    break
                default:
                    commit('updateTheme', DarkTheme)
                    break
            }
        }
    },
    getters:{
        getTheme(state){
            return state.theme
        }
    }
}

export default App;