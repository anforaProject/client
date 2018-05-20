<style>

</style>

<template>
  <div id="app-layout">
    <div class="page-content">
      <div id="side-bar">
        <h1 class="title">Zinat</h1>
        <nav v-show="isLoggedIn()" id="menu">
            <router-link  class="menu-element" to="/" exact-active-class="active">Home Feed</router-link>
            <router-link  class="menu-element" to="/explore" exact-active-class="active">Explore</router-link>
            <router-link  class="menu-element" to="/notifications" exact-active-class="active" >Notifications</router-link>
            <router-link  class="menu-element" :to="'/@'+currentUser.uri" exact-active-class="active">Profile</router-link>
            <a href="#" class="menu-element" @click="logout()">Logout</a>
        </nav>
        <nav v-show="!isLoggedIn()" id="menu">
            <a href="#" class="menu-element" @click="login()">Login</a>
        </nav>
      </div>
      <div id="main-content">
        <navigation></navigation>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

  //Components
  import Navigation from './Navigation.vue';

  //methods
  import { isLoggedIn, logout} from '../utils/auth';

  export default {
    name: 'Layout',
    components: {
          Navigation,
    },
    data() {
      return{
        currentUser: {"uri":"test"}
      }
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

  @font-face {
  font-family: "Roboto";
  src: url("/assets/fonts/Roboto-Black.ttf") format("ttf");
  }

  html{
    font-family: "Roboto Vera Serif Bold";
    height: 100%;
  }
  body{
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
      margin-right: 0px;
      padding: 0;
      font-size: 10pt;
      font-family: "Trebuchet MS", sans-serif;
      max-height: 100vh;
  }

  .active{
    border-left: 4px solid #ff2929;
  }

  .menu-element{
    text-decoration:none;
    color: inherit;
    display: inline-block;
    grid-row: span 1;
    height: 5vh;
    line-height: 4.5vh;
    text-align: left;
    vertical-align: middle;
    padding-left: 1em;
   }

  .page-content{
    display: grid;
    grid-template-columns: 15% 85%;
    height: 100vh;
  }

  .title{
    padding-left: 0.5em;
  }

  #side-bar{

    padding-left: 1em;
    max-width: 100%;

    background-color: #ffffff;
    box-shadow: 5px 2px 2px #DEDEDE;
    z-index: 0;
  }
  #main-content{

    padding-left: 1em;
    max-width: 100%;

    background-color: #f1f5f8;
  }

  #menu{
    display: grid;
    grid-auto-rows: 10% 10% 10% 10% auto;
    margin-top: 10%;
  }
</style>
