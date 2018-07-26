<template lang="html">

<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
  </div>

  <div class="navbar-menu" v-if="isLoggedIn()">
    <div class="navbar-start">
      <router-link  class="navbar-item" to="/home" >{{$t("navigation.homeFeed")}}</router-link>
      <router-link  class="navbar-item" to="/explore" >{{$t("navigation.explore")}}</router-link>
      <router-link  class="navbar-item" to="/notifications">{{$t("navigation.notifications")}}</router-link>
      <router-link  class="navbar-item" v-if="user" :key="$route.fullPath" :to="{name:'profile', params:{id:user.id}}">{{$t("navigation.profile")}}</router-link>
    </div>

    <div class="navbar-end">
      <a class="navbar-item" href="/upload"  ><i class="fa fa-upload"></i></a>
      <a class="navbar-item" href="/settings">{{$t("navigation.settings")}}</a>
      <a class="navbar-item" href="#" @click="logout()">{{$t("navigation.logout")}}</a>
    </div>
  </div>
</nav>

</template>


<script>

import { isLoggedIn, logout} from '../../utils/auth';
 

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
  mounted(){
    
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
