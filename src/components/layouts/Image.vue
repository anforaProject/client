<template lang="html">
  <div class="cell" v-on:click="displayModal()">
    <div class="modal" v-bind:class="cravings">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="image">
          <img :src="image.media_attachments[0].url">
        </p>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    
    <div class="image placeholder" v-bind:style="imageHolder"></div>
    
  </div>
  
  
</template>

<script type="text/javascript">
export default {
  name: "imageModal",
  props:['image'],
  data(){
    return({
      showModal: false,
      imageHolder:{
        backgroundImage: `url('${this.image.media_attachments[0].preview_url}')`,
      }
    })
  },
  computed:{
    cravings(){
      return this.showModal ? 'is-active' : ''
    }
  },
  methods:{
    change(){
      this.showModal = !this.showModal
    },
    displayModal(){
      this.showModal = !this.showModal
    }
  }
}

</script>

<style media="screen">
.placeholder{
  width: 280px;
  height: 280px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}
</style>
