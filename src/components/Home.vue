<template id="mainView">
    <div class="columns" v-if="ready" id="container">
      <div class="column is-6 is-offset-3  is-hidden-mobile" v-if="timeline.length > 0">
          <ImageCard
            v-for="(image, index) in timeline"
            v-bind:key="index"
            v-bind:image="image"
            v-bind:userProfile="image.account"
          ></ImageCard>
      </div>

      <div class="column is-12 is-hidden-desktop" v-if="timeline.length > 0">
          <ImageCard
            v-for="(image, index) in timeline"
            v-bind:key="index"
            v-bind:image="image"
            v-bind:userProfile="image.account"
          ></ImageCard>
      </div>

    </div>
    <div class="loading" v-else>
        Loading...
    </div>

</template>

<script type="text/javascript">

import Layout from './layouts/mainLayout.vue'
import zinatAPI from '../utils/zinatjs/serverConnection.js'
import ImageCard from './layouts/ImageCard.vue'
import {SSE} from 'sse.js'
import urls from '../utils/zinatjs/urlMap.js'



export default {
  name: 'Home',
  components: {Layout,ImageCard},
  data(){
    return{
      ready: false,
      timeline: [],
      messages: []
    }
  },
  mounted(){
    this.setHomeTimeline()
    this.stream();

  },
  computed:{
    user(){
      return this.$store.getters['profiles/currentAccount']
    }
  },
  methods:{
    setHomeTimeline(){
      zinatAPI.getHomeTimeline(this.user.token)
      .then(response=>{
        this.timeline = response.data
        this.ready = true
      })
      .catch(e=>{
        console.log(e)
      })
    },
    stream(){
      var url = process.env.VUE_APP_CLIENT_DOMAIN
      var source = new SSE(url + urls.streamingHome, {headers: {'Authorization': `${this.user.token}`}});
      let self = this;
      source.addEventListener('message', function(e) {
        console.log(e)
        self.timeline.unshift(JSON.parse(e.data))
      });
      source.stream();
    }
  }
}
</script>

<style media="css">
</style>
