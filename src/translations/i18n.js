import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let translations = {
    en: {
        navigation: {
            profile: 'Profile',
            homeFeed: 'Home',
            explore: 'Explore',
            notifications: 'Notifications',
            settings: 'Settings',
            logout: 'Logout',
            login: 'Login'
        },
        profiles: {
            posts: 'Posts',
            followers: 'Followers',
            following: 'Following'
        }
    },
    es: {
        navigation: {
            profile: 'Perfil',
            homeFeed: 'Inicio',
            explore: 'Explorar',
            notifications: 'Notificaciones',
            settings: 'Configuración',
            logout: 'Cerrar sesión',
            login: 'Iniciar Sesión'
        },
        profiles: {
            posts: 'Posts',
            followers: 'Seguidores',
            following: 'Sigue'
        }
    }
}

const i18n = new VueI18n({
    locale: 'es',
    messages: translations 
})

export default i18n