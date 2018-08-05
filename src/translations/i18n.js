import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let translations = {
    en: {
        messages:{
            homePage: 'Federated image sharing powered by ActivityPub'
        },
        navigation: {
            profile: 'Profile',
            homeFeed: 'Home',
            explore: 'Explore',
            notifications: 'Notifications',
            settings: 'Settings',
            logout: 'Logout',
            login: 'Login',
            singUp: 'Sign Up'
        },
        profiles: {
            posts: 'Posts',
            followers: 'Followers',
            following: 'Following'
        }
    },
    es: {
        messages:{
            homePage: 'Plataforma federada para compartir imágenes basada en ActivityPub'
        },
        navigation: {
            profile: 'Perfil',
            homeFeed: 'Inicio',
            explore: 'Explorar',
            notifications: 'Notificaciones',
            settings: 'Configuración',
            logout: 'Cerrar sesión',
            login: 'Iniciar Sesión',
            singUp: 'Registrarse'
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