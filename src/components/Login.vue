<template lang="html">
  <Layout>
    <input type="text" v-model="username" value="">
    <input type="password" v-model="password" value="">
    <button @click="login">Login</button>
  </Layout>

</template>

<script>
import {login} from '../utils/auth';
import Layout from './layouts/mainLayout.vue'

export default {
  name: "app",
  components: {Layout},
  data(){
    return{
      username: null,
      password: null,
      callback: this.$route.query.redirect || '/home'
    }
  },
  methods:{
    login(){
      login({username:this.username, password:this.password})
      .then(
        account =>{
          console.log(account)
          this.$store.dispatch('profiles/populateData')
          this.$router.push('/home')
        }
      )
      
      
    }
  }
}
</script>

<style lang="css">
</style>
