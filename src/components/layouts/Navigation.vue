<template lang="html">
  <div id="nav" v-if="user">
    
    <!-- side bar navigation -->

    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" v-on:click="item.action">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{item.title}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> 
    </v-navigation-drawer>


    <!-- mobile navigation -->

    <v-bottom-nav 
        :value="true"
        fixed
        color="black"
        class="hidden-md-and-up"
      >
          
        <v-btn
          color="teal"
          flat
        >
          <span><router-link  to="/home" :title='$t("navigation.homeFeed")' ><v-icon>home</v-icon></router-link></span>
        </v-btn>

        <v-btn
          color="teal"
          flat
        >
          <span><router-link to="/explore" ><v-icon>explore</v-icon></router-link></span>
        </v-btn>

        <v-btn
          color="teal"
          flat
        >
          <span><a href="/upload"  ><v-icon>cloud_upload</v-icon></a></span>
        </v-btn>

        <v-btn
          color="teal"
          flat
        >
          <span><router-link to="/notifications"  :title='$t("navigation.notifications")'><v-icon>notifications</v-icon></router-link></span>
        </v-btn>

        <v-btn
          color="teal"
          flat
        >
          <span><router-link :title='$t("navigation.profile")' :key="$route.fullPath" :to="{name:'profile', params:{id:user.id}}"><v-icon>person</v-icon></router-link></span>
        </v-btn>
      </v-bottom-nav>
  </div>
</template>


<script>

import {logout} from '../../utils/auth';
import {SSE} from 'sse.js'
import urls from '../../utils/zinatjs/urlMap.js'
import ClickOutside from 'vue-click-outside'
import Appearence from '../../constants/theme.js'


export default {
  name: 'Navigation',
  data(){
    return{
      notifications: 1,
      dropActive: false,
      darkMode: this.$store.getters['preferences/getTheme'],
      items: [
        { title: 'Home', icon: 'home', action: ()=>{ this.$router.push({name:'home'})} },
        { title: 'Explore', icon: 'explore', action: ()=>{ this.$router.push({name:'explore'})} },
        { title: 'About', icon: 'question_answer', action: ()=>{ this.$router.push({name:'home'})}  },
        { title: 'New Post', icon: 'cloud_upload', action:()=>{this.$router.push('/upload')}},
      ],
      mini: true,
      right: null
    }
  },
  props:['drawer'],
  computed:{
    user(){
      return this.$store.getters['profiles/currentAccount']
    }
    
  },
  mounted(){
      this.stream();
  },
  methods:{
    isLoggedIn() {
      return (this.user !== null && this.user !== undefined) || false
    },
    logout(){
      logout();
      this.$router.push('/');
    },
    login(){
      this.$router.push({name:'login', query: { redirect: this.$router.path }})
    },

    stream(){
      if(this.isLoggedIn()){
        var url = process.env.VUE_APP_CLIENT_DOMAIN
        var source = new SSE(url + urls.streamingHome, {headers: {'Authorization': `${this.user.token}`}});
        let self = this;
        source.addEventListener('notification', function(e) {
          self.notifications += 1;
          console.log(e)
        });
        source.stream();
      }
    },

    drop(){
      this.dropActive = !this.dropActive
    },

    hide(){
      this.dropActive = false
    },
    
    setDarkMode(){
      console.log("Go dark")

      if(!this.darkMode){
        this.$store.dispatch('preferences/updateTheme', Appearence.RedMoon)
        this.darkMode = true
      }else{
        this.$store.dispatch('preferences/updateTheme', Appearence.Dark)
        this.darkMode = false
      }

      console.log(this.$store.getters['preferences/getTheme'])

    }
  },
  directives: {
      ClickOutside
  }
}
</script>

<style media="scss">
.v-list__tile__action > a {
  text-decoration: none;
}

</style>
