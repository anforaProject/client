<template>
  <div id="app" :class="{'dark': theme === 'dark', 'redmoon': theme==='redmoon'}">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Anfora',
  data(){
    return {
    }
  },
  computed: {
    ...mapGetters({
        theme: 'preferences/getTheme'
    })

  },

  watch:{
    'theme': function (newVal) {
      if(newVal==='redmoon'){
        document.body.style.backgroundColor = "#020003"
        document.getElementsByTagName('html').style.backgroundColor = "#020003"
      }
      else if(newVal==='dark'){
        document.body.style.backgroundColor = "#313543"
        document.getElementsByTagName('html').style.backgroundColor = "#313543"
      }
      else if(newVal==='light'){
        document.body.style.backgroundColor = "#fff"
        document.getElementsByTagName('html').style.backgroundColor = "fff"
      }
    },
  }
}


</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  
  
  //$body-background-color: var(--theme-background-color);
  
  $dark-background: #313543;
  $dark-card-background: #282c37;
  $dark-text: #8899a6;
  $dark-strong: #d9e1e8;

  $redmoon-color-border: #FF5230;
  $redmoon-background: #020003;
  $redmoon-card-background: #232323;
  $redmoon-element: #FF5230;

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  
  //$background: #282c37;
  //html{background-color: #282c37;}

  i, .icon {
    color: #fff;
  }
  .dark{
      background-color: $dark-background;
      color: #fff;

      nav {
        background-color: $dark-background;

        a {
          color: #8899a6 !important;
        }

        .navbar-item, .navbar-divider{
          background-color: $dark-background;
        }

        .navbar-brand > a.navbar-item:hover{
          background-color: $dark-background;
        }
      }

      .card{
        background-color: $dark-card-background;
        border-color: #fff
      }

      p {
        color: $dark-text;
      }

      strong {
        color: $dark-strong;
      }

      span{
        color: $dark-text;
      }
  }

  .redmoon{
      
      background-color: $redmoon-background;
      color: #fff;
      
      nav {
        background-color: $redmoon-background;

        a {
          color: #8899a6 !important;
        }

        .navbar-item, .navbar-divider{
          background-color: $redmoon-background;
        }


      }

      .navbar-dropdown{
        background-color: $redmoon-background;
      }

      a.navbar-item:hover{
          background-color: $dark-background;
      }

      a{
        color: $redmoon-element;
      }


      h1,h2,h3,h4,h5,h6 {
        color: #8899a6;
      }


      p {
        color: $dark-text;
      }

      strong {
        color: $dark-strong;
      }

      span{
        color: $dark-text;
      }

      .card{
        background-color: $redmoon-card-background;
        border-color: #fff;
        border-radius: 4px;
      }

      .colored-icon{
        color: $redmoon-element;
      }

      i, .icon{
        color: #fff;
      }

      .navbar-link::after{
        border-color: $redmoon-element;
      }

  }
</style>
