<template>
  <div id="app-layout">
    <div class="page-content">
      <Navigation></Navigation>
      <!--<slot class="b"></slot>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  //Components
  import Navigation from './Navigation.vue';

  export default {
    name: 'Layout',
    components: {
          Navigation,
    },
    data() {
      return{

      }
    },
    created(){
    },
    methods:{
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

  .b{
    background-color: #c4c4c4;
  }
</style>
