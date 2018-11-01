<template lang="html">
  <div class="columns" v-if="ready">
    <br>
    <div class=" column is-8 is-offset-2 card is-hidden-mobile">
      <div class="card-image">
        <figure v-if="image.media_attachments[0].type == 'image'">
          <img :src="image.media_attachments[0].url" alt="Placeholder image">  
        </figure>
        <figure v-else>
            <video ref="video" @click="playVideo()" controls loop>
              <source  :src="image.media_attachments[0].url"  type="video/mp4">
            </video>  
        </figure>
      </div>
    </div>
  </div>  
</template>

<script type="text/javascript">
import zinatAPI from '../utils/zinatjs/serverConnection.js'

export default {
  name: "statusPage",
  props:['image'],    
  data(){
    return({
        ready: false,
        comments: [],
    })
  },
  computed:{
    user(){
        return this.$store.getters['profiles/currentAccount']  
    }
  },
  mounted(){
    this.retriveStatus(),
    this.retriveComments()
  },
  methods:{
    retriveStatus(){
        if (this.image === null || this.image === undefined){
          zinatAPI.retriveStatus(this.$route.params.id)
          .then(response => {
              this.image = response.data
              this.ready = true
          })
          .catch(e=>{
            console.log(e)
          })
        }
    },

    retriveComments(){
      console.log("Retrieving comments")
    }
  }
}

</script>

<style media="screen">

.image-circle img{
    border-radius: 4px;
}

.is-vcentered {
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-card{
  height: 80%;
  min-height: 80%; 
}


</style>