<template id="userView">
  <div id="user-photos">
    <template v-if="ready">
      <div id="statuses">
        <imageMinature
          v-for="image in images"
          v-bind:key="image.id"
          v-bind:image="image"
        ></imageMinature>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">

  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import imageMinature from '../layouts/Image.vue'

  export default {
    name: 'UserPhotos',
    data(){
      return{
        ready: false,
        images:[]
      }
    },
    components:{
      imageMinature
    },
    mounted(){
      this.setImages()
    },
    methods:{
      setImages(){
        zinatAPI.retriveImages(this.$route.params.username)
        .then(response=>{
          this.ready = true
          this.images = response.data
          console.log(this.images)
        })
        .catch(e=>{
          console.log(e)
        })
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
