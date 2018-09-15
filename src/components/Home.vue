<template id="mainView">
    <div class="columns" v-if="ready" id="container">
      <div class="column is-4 is-offset-3  is-hidden-touch">
          <ImageCard
            v-if="timeline.length > 0"
            v-for="image in timeline"
            v-bind:key="image.id"
            v-bind:image="image"
            v-bind:userProfile="image.account"
          ></ImageCard>
      </div>

      <div class="column is-12 is-hidden-desktop">
          <ImageCard
            v-if="timeline.length > 0"
            v-for="image in timeline"
            v-bind:key="image.id"
            v-bind:image="image"
            v-bind:userProfile="image.account"
          ></ImageCard>
      </div>

      <div class="column is-3 is-offset 2 body-columns is-hidden-mobile" id="right">
        This will be a cool column with stories and links. For now take this ❤
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
        this.ready = true
        this.timeline = response.data
      })
      .catch(e=>{
        console.log(e)
      })
    },
    stream(){
      var url = 'https://anfora.test'
      var source = new SSE(url + urls.streamingHome, {headers: {'Authorization': `${this.user.token}`}});
      let self = this;
      source.addEventListener('update', function(e) {
        self.timeline.unshift(JSON.parse(e.data))
      });
      source.stream();
    }
  }
}
</script>

<style media="css">
</style>
