<template>
  <v-app id="app" dark>

    
    <!-- Navigation -->

    <Navigation :drawer="drawer"></Navigation>


    <!-- end navigation -->


    <!-- Toolbar -->

    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Anfora</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>


    <!-- end toolbar -->


    <v-content>
      <v-container fill-height :class="{'px-0': $vuetify.breakpoint.xsOnly }">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Navigation from './components/layouts/Navigation.vue'
export default {
  name: 'Anfora',
  data(){
    return {
      drawer:false
    }
  },

  components: {
    Navigation,
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

</style>
