<template lang="html">
  <div id="app">
    <input type="text" v-model="username" value="">
    <input type="password" v-model="password" value="">
    <button @click="login">Login</button>
  </div>

</template>

<script>
import {login} from '../utils/auth';

export default {
  name: "app",
  data(){
    return{
      username: null,
      password: null,
      callback: this.$route.query.redirect || '/'
    }  
  },
  methods:{
    login(){
      login({username:this.username, password:this.password, callback:this.callback})
    }
  }
}
</script>

<style lang="css">
</style>
