<template id="userView">
  <div id="user-photos" class="container">
    <template v-if="ready">
      <div v-for="image in images" class="column is-one-third" :key="image.id">
        <div class="panel">
            <imageMinature
              v-bind:image="image"
            ></imageMinature>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">

  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import imageMinature from '../layouts/Image.vue'

  export default {
    name: 'UserPhotos',
    props: {
      profile: Object,
    },
    data(){
      return{
        ready: false,
        images:[],
      }
    },
    components:{
      imageMinature
    },
    created(){
      this.user = this.$store.getters['profiles/getRelation']
    },
    mounted(){
      this.setImages(this.$route.params.id)
      .then( () =>
        this.ready=true
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
  width: 100%;
  max-width: 100%;
}
</style>
