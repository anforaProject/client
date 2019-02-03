<template id="mainView">
    <section class="hero is-info is-fullheight" id="hero">
    <div class="hero-body">
      <div class="columns">

        <div class="column is-4 is-offset-2">
          <div class="container">
            <h1 class="title centered">
              Anfora
            </h1>
            <h2 class="subtitle">
              {{$t("messages.homePage")}}
            </h2>

            <div class="columns">
              <div class="column is-6">
                <router-link  class="button is-success " to="/login" :title='$t("navigation.login")'>{{$t("navigation.login")}}</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-4 is-offset-2">
          <div class="box">
                <div class="field">
                    <div class="control">
                        <input class="input is-large" v-validate="'required|alpha_num'" type="text" name="username" v-model="data.username" placeholder="Username" autofocus="">
                    </div>
                    <p class="help is-danger">{{ errors.first('username') }}</p>
                </div>

               <div class="field">
                    <div class="control">
                        <input class="input is-large" v-validate="'confirmed:pw_confirmation|required'" type="password" name="password" v-model="data.password" placeholder="Your Password">
                    </div>
                    <p class="help is-danger">{{ errors.first('password') }}</p>
                </div>

                <div class="field">
                    <div class="control">
                        <input class="input is-large"  v-validate="'required'" type="password" ref="pw_confirmation" name="confirmation" v-model="data.password_confirmation" placeholder="Repeat your Password">
                    </div>
                    <p class="help is-danger">{{ errors.first('confirmation') }}</p>
                </div>

                <div class="field">
                    <div class="control">
                        <input class="input is-large" v-validate="'required|email'" type="text" name="email" v-model="data.email" placeholder="Your Email" autofocus="">
                    </div>
                    <p class="help is-danger">{{ errors.first('email') }}</p>
                </div>

 
                <div class="field">
                    <label class="checkbox">
                    <input type="checkbox" v-validate="'required'" name="conditions">
                    I accept the <router-link :to="{name:'terms'}">Terms</router-link> and the <router-link :to="{name:'more'}">instance rules</router-link>.
                    </label>
                    <p class="help is-danger">{{ errors.first('conditions') }}</p>
                </div>
                <button class="button is-block is-info is-large is-fullwidth" @click="register">Register</button>
            </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
  import Layout from './layouts/mainLayout.vue'
  import zinatAPI from '../utils/zinatjs/serverConnection.js'

  export default {
    name: 'LandingPage',
    components: {Layout},
    data(){
      return{
        loading: true,
        data: {}
      }
    },
    methods:{
      register(){
        this.$validator.validate().then(result => {
          if (result) {
            zinatAPI.registerUser(this.data).then(()=>{
              this.$dialog.alert({
                title: 'Registration',
                message: `Your request was sent successfully!<br/>Please check your email to confirm the registration`,
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
        })
      }
    }
  }
</script>

<style media="screen">
#hero{
  background-image: url('/img/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden; 
  opacity: 0.9;
}
</style>
