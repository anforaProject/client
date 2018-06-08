<template lang="html">
  <div id="status">
    <div class="status-card">
      <imageModal v-bind:image="image"></imageModal>
    </div>
  </div>


</template>

<script>

  import imageModal from '../states/imageModal.vue'
  export default {


    name: "imageMinature",
    props:['image'],
    components:{
      imageModal
    },
    data(){
      return({})
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
