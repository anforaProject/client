<template id="mainView">
  <Layout>
    <div class="loading" v-if="loading">
        Loading...
    </div>
  </Layout>
</template>

<script type="text/javascript">
import Layout from './layouts/mainLayout.vue'


export default {
  name: 'Home',
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

nav { width: 100%; }
nav ul { list-style: none; padding: 0px; margin: 0px; font-weight: bold; text-align: center; }
nav ul li { display: inline-block; }
nav ul li a { display: block; padding: 10px 20px; text-decoration: none; color: #444; }
nav ul li a:hover { background-color: #888; color: #fff; }

@media (max-width:48.000em){
  nav ul { width: 100%; font-weight: normal; }
  nav ul li { width: 50%; float: left; }
  nav ul li:nth-of-type(odd) a { border-right: 1px solid #ccc; }
  nav ul li a { padding: 8px 0px; border-bottom: 1px solid #ccc; display: block; }
}

</style>
