<template id="userView">
  <div id="user-photos">
    <template v-if="loading">
      <imageTemplate
        v-for="image in images"
        v-bind:key="image.id"
        v-bind:image="image"
      ></imageTemplate>
    </template>
  </div>
</template>

<script type="text/javascript">

  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import imageTemplate from '../layouts/Image.vue'

  export default {
    name: 'UserPhotos',
    data(){
      return{
        loading: false,
        images:[]
      }
    },
    components:{
      imageTemplate
    },
    mounted(){
      this.setImages()
    },
    methods:{
      setImages(){
        zinatAPI.retriveImages()
        .then(response=>{
          this.loading = true
          this.images = response.data.statuses
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



}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {

}

</style>
