<style>

</style>

<template>
  <div id="app-layout">
    <div class="page-content">
      <div id="side-bar">
        <h1 class="title">Zinat</h1>
        <nav v-if="userLogged" id="menu">
            <router-link  class="menu-element" to="/" exact-active-class="active">Home Feed</router-link>
            <router-link  class="menu-element" to="/explore" exact-active-class="active">Explore</router-link>
            <router-link  class="menu-element" to="/notifications" exact-active-class="active" >Notifications</router-link>
            <router-link  class="menu-element" :to="'/@'+currentUser.uri" exact-active-class="active">Profile</router-link>
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
  import Navigation from './Navigation.vue';

  export default {
    name: 'Layout',
    components: {
          Navigation,
    },
    data() {
      return{
        userLogged: true,
        currentUser: {"uri":"test"}
      }
    }
  }
</script>

<style media="screen">
  html{
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
