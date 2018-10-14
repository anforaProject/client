<template lang="html">
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Password Reset form</h3>
                    <p class="subtitle has-text-grey">Please fill your new credentials</p>
                    <div class="box">
                        <div class="field">
                            <div class="control">
                                <input class="input is-large" type="password" v-model="password" placeholder="Your new password" autofocus="">
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <input class="input is-large" type="password" v-model="password_conf" placeholder="Repeat your password">
                            </div>
                        </div>
                        <button class="button is-block is-info is-large is-fullwidth" @click="login">Reset Password</button>
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
import Layout from './layouts/mainLayout.vue'
import zinatAPI from '../utils/zinatjs/serverConnection.js'

export default {
  name: "PasswordReset",
  components: {Layout},
  data(){
    return{
      password_conf: null,
      password: null,
      callback: this.$route.query.redirect || '/home'
    }
  },
  methods:{
    login(){
        let data = {
            password: this.password,
            password_confirmation: this.password_conf,
            token: this.$route.params.token
        }
        zinatAPI.passwordReset(data).then(()=>{
            this.$dialog.alert({
            title: 'Password Reset',
            message: `Your request was sent successfully! You will be redirected`,
            type: 'is-info',
            onConfirm: () => this.$router.push('/login')
            })
        }).catch(e=>{
            this.$toast.open({
                message: `Oops! ${e.message}`,
                type: 'is-danger'
            })
        })
}
  }
}
</script>

<style lang="css">
</style>
