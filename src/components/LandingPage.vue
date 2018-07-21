<template id="mainView">
  <Layout>
    <div class="wrap">
      <div class="info">
        <ul>
          <li>Federated image sharing</li>
          <li>Powered by ActivityPub</li>
        </ul>
      </div>
      <div class="register">
        <h2>Register</h2>

        <p>or</p>

        <h2> <a href="/login">Sign in</a> </h2>
      </div>
    </div>
  </Layout>
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
