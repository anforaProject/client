<template lang="html">
  <div id="status">
    <div class="status-card">
      <imageModal v-bind:image="image" v-bind:layaout="layaout"></imageModal>
    </div>
  </div>


</template>

<script>

  import imageModal from '../states/imageModal.vue'
  export default {


    name: "imageMinature",
    props:['image', 'layaout'],
    components:{
      imageModal
    },
    methods:{
      displayModal(){
        this.showModal = !this.showModal
      }
    }
  }
</script>

<style lang="css">

</style>
