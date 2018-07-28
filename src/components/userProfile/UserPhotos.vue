<template id="userView">
  <div id="user-photos" class="container">
    <template v-if="ready">
        <imageMinature
          v-for="(image, index) in images"
          v-bind:key="image.id"
          v-bind:image="image"
          v-bind:layaout="display[index]"
        ></imageMinature>
    </template>
  </div>
</template>

<script type="text/javascript">

  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import imageMinature from '../layouts/Image.vue'
  import layaut from 'justified-layout'

  export default {
    name: 'UserPhotos',
    data(){
      return{
        ready: false,
        images:[],
        display:{}
      }
    },
    components:{
      imageMinature
    },
    created(){
      this.user = this.$store.getters['profiles/currentAccount']
    },
    mounted(){
      this.setImages(this.$route.params.id).then(
        //When images are on the client 
        () => {
        new Promise((resolve)=>{
          //Calculate the layaour distribution
          let resolutions = this.images.map(image => image.media_attachments[0].meta.original.aspect)
          resolve(resolutions)
        }).then(
          resolutions => {
            this.display = layaut(resolutions).boxes
            this.ready=true
          }
        )
      }
      
      )
    },
    methods:{
      setImages(id){
        //Create a promise solved after the images are on the client
        return new Promise((resolve) => {
          zinatAPI.retriveImages(id)
          .then(response=>{
            //this.ready = true 
              this.images = this.images.concat(response.data)
              resolve()
            })
          })
          .catch(e=>{
            console.log(e)
          })
      }
    },
    beforeRouteUpdate(to,from, next) {
      this.setImages(to.params.id)
      next()
    }
  }
</script>

<style>
#user-photos{
  display: flex;
  flex-wrap: wrap;
}
</style>
