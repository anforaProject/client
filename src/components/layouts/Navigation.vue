<template lang="html">

<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
  </div>

  <div class="navbar-menu" v-if="isLoggedIn()">
    <div class="navbar-start">
      <router-link  class="navbar-item" to="/home" :title='$t("navigation.homeFeed")' ><i class="material-icons">home</i></router-link>
      <router-link  class="navbar-item" to="/explore" ><i class="material-icons">explore</i></router-link>
      <router-link  class="navbar-item" v-if="user" :title='$t("navigation.profile")' :key="$route.fullPath" :to="{name:'profile', params:{id:user.id}}"><i class="material-icons">person</i></router-link>

    </div>

    <div class="navbar-end">
      <router-link  class="navbar-item" to="/notifications" :title='$t("navigation.notifications")'><i class="material-icons">notifications</i></router-link>
      <a class="navbar-item" href="/upload"  ><i class="material-icons">cloud_upload</i></a>
      <router-link  class="navbar-item" :title='$t("navigation.profile")' :to="{name:'settings'}"><i class="material-icons">settings</i></router-link>
      <a class="navbar-item" href="#" :title='$t("navigation.logout")' @click="logout()"><i class="material-icons">power_settings_new</i></a>
    </div>
  </div>
</nav>

</template>


<script>

import {logout} from '../../utils/auth';
 

export default {
  name: 'Navigation',
  data(){
    return{
      
    }
  },
  computed:{
    user(){
      return this.$store.getters['profiles/currentAccount']
    }
    
  },
  methods:{
    isLoggedIn() {
      return this.user !== undefined
    },
    logout(){
      return logout();
    },
    login(){
      this.$router.push({name:'login', query: { redirect: this.$router.path }})
    }

  }
}
</script>

<style media="screen">


  nav{
    height: 3em;
  }

  nav .router-link-exact-active{
    border-bottom: 4px solid #77abda;
    color: #77abda  !important;
  }


</style>
