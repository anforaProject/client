<template id="mainView">
  <Layout>
    <div class="homeTimeline" v-if="ready">
      <div id="statuses">
        <imageMinature
          v-for="image in timeline"
          v-bind:key="image.id"
          v-bind:image="image"
        ></imageMinature>
      </div>
    </div>
    <div class="loading" v-else>
      Loading...
    </div>
  </Layout>
</template>

<script type="text/javascript">
import Layout from './layouts/mainLayout.vue'
//import zinatAPI from '../utils/zinatjs/serverConnection.js'
import imageMinature from './layouts/Image.vue'

export default {
  name: 'Home',
  components: {Layout,imageMinature},
  data(){
    return{
      ready: false,
      timeline: [],
    }
  },
  mounted(){
    this.setHomeTimeline()
    console.log(this.$store.getters['profiles/currentAccount'])
  },
  methods:{
    setHomeTimeline(){
      this.$store.getters.currentAccount
      /*
      zinatAPI.getHomeTimeline(this.$route.params.username)
      .then(response=>{
        this.ready = true
        this.timeline = response.data
        console.log(this.timeline)
      })
      .catch(e=>{
        console.log(e)
      })
    */

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
