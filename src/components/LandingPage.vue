<template id="mainView">
    <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title centered">
          Anfora
        </h1>
        <h2 class="subtitle">
          {{$t("messages.homePage")}}
        </h2>

        <div class="columns">
          <div class="column is-3">
             <router-link  class="button is-success is-pulled-right" to="/login" :title='$t("navigation.singUp")'>{{$t("navigation.singUp")}}</router-link>
             <router-link  class="button is-outlined" to="/login" :title='$t("navigation.login")'>{{$t("navigation.login")}}</router-link>
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
/* Custom, iPhone Retina */
@media only screen and (min-width : 320px) {

}

/* Extra Small Devices, Phones */
@media only screen and (min-width : 480px) {

}

/* Small Devices, Tablets */
@media only screen and (min-width : 768px) {

}

/* Medium Devices, Desktops */
@media only screen and (min-width : 992px) {

#statuses{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  width: 80%;
}

}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {

}

</style>
