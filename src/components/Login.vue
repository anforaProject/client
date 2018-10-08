<template lang="html">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
                    <div class="box">
                        <div class="field">
                            <div class="control">
                                <input class="input is-large" type="text" v-model="username" placeholder="Your username" autofocus="">
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <input class="input is-large" type="password" v-model="password" placeholder="Your Password">
                            </div>
                        </div>
                        <div class="field">
                            <label class="checkbox">
                            <input type="checkbox">
                            Remember me
                            </label>
                        </div>
                        <button class="button is-block is-info is-large is-fullwidth" @click="login">Login</button>
                    </div>
                    <p class="has-text-grey">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
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
        () =>{
          this.$router.push({path:'home'})
        }
      ).catch(error =>{
        console.log(error)
        if (error.response) {
            if (error.response.status === 401) {
                this.$toast.open({
                    message: `The combination of password and username is not valid`,
                    type: 'is-danger'
                })
            } else {
                this.$toast.open({
                    message: `Oops! The server returned an error`,
                    type: 'is-danger'
                })
            }
        } else {
            this.$toast.open({
                message: `Oops! ${error.message}`,
                type: 'is-danger'
            })
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
