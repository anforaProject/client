<template lang="html">
  <nav class="top-nav" v-show="isLoggedIn()">
    <a href="#" id="logo">Zinat</a>
    <div id="links">
      <router-link  class="main-menu-element" to="/home" >Home Feed</router-link>
      <router-link  class="main-menu-element" to="/explore" >Explore</router-link>
      <router-link  class="main-menu-element" to="/notifications">Notifications</router-link>
      <router-link  class="main-menu-element" :to="'/@'+currentUser.uri">Profile</router-link>

    </div>
    <div id="user">
      <a href="/upload" class="menu-element">Upload</a>
      <a href="/settings" class="menu-element">Settings</a>
      <a href="#" class="menu-element" @click="logout()">Logout</a>
    </div>
  </nav>
</template>


<script>

import { isLoggedIn, logout} from '../../utils/auth';

export default {
  name: 'Navigation',
  data(){
    return({
      currentUser:{"uri":"test"}
    })
  },
  methods:{
    isLoggedIn() {
      return isLoggedIn();
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

/* Custom, iPhone Retina */
@media only screen and (min-width : 320px) {

}

/* Extra Small Devices, Phones */
@media only screen and (min-width : 480px) {

}

/* Small Devices, Tablets */
@media only screen and (min-width : 768px) {

}

/* Medium Devices, Desktops */
@media only screen and (min-width : 992px) {
  nav{
    height: 4em;
    width: 100%;

    max-width: 100%;

    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 100%;
    background-color: #ffffff;
    box-shadow: 2px 4px 2px #DEDEDE;

    margin-bottom: 1em;
  }

  .router-link-exact-active{
    border-bottom: 4px solid #77abda;
    color: #77abda  !important;
  }

  .main-menu-element{
    grid-column-start: span 1;
    grid-row-start: 1;

    text-decoration:none;
    color: #c4c4c4;
    max-height: 100%;
    font-size: 150%;
    text-align: center;

    display: grid;
    align-items: center;
    height: 100%;
  }

  .menu-element{
    grid-column-start: span 1;
    grid-row-start: 1;

    text-decoration:none;
    color: #c4c4c4;
    max-height: 100%;
    text-align: center;

    display: grid;
    align-items: center;
    height: 100%;
  }

  #links{
    grid-column-start: span 1;

    display: grid;
    grid: repeat(4, auto) / 1;

    color: inherit;
    width: 60%;
    margin: auto;
    height: 100%;
  }

  #logo{
    /*row-start column-start row-end column-end*/
    grid-column-start: span 1;
    text-align: center;
    font-size: 300%;
    text-decoration: none;
    color: inherit;

    display: grid;
    align-items: center;
  }

  #user{
    grid-column-start: span 1;

    display: grid;
    grid: repeat(4, auto) / 1;

    color: inherit;
    width: 60%;
    margin: auto;
    height: 100%;
  }

}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {

}


</style>
