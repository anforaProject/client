<template id="mainView">
    <section class="hero is-info is-fullheight" id="hero">
    <div class="hero-body">
      <div class="columns">

        <div class="column is-6">
          <div class="container">
            <h1 class="title centered">
              Anfora
            </h1>
            <h2 class="subtitle">
              {{$t("messages.homePage")}}
            </h2>

            <div class="columns">
              <div class="column is-6">
                <router-link  class="button is-success is-pulled-right" to="/login" :title='$t("navigation.singUp")'>{{$t("navigation.singUp")}}</router-link>
                <router-link  class="button is-outlined" to="/login" :title='$t("navigation.login")'>{{$t("navigation.login")}}</router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
  import Layout from './layouts/mainLayout.vue'

  export default {
    name: 'LandingPage',
    components: {Layout},
    data(){
      return{
        loading: true,
        errors: [],
        user: null
      }
    }
  }
</script>

<style media="screen">
#hero{
  background-image: url('/img/guus-baggermans-101965-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden; 
  opacity: 0.9;
}

::-webkit-scrollbar { 
    display: none; 
}
</style>
