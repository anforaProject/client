<template lang="html">
  <div class="cell" v-bind:style="cardDimensions" v-on:click="displayModal()">
    <div class="modal" v-bind:class="cravings">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="image">
          <img :src="image.media_attachments[0].url">
        </p>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>

  </div>

</template>

<script type="text/javascript">
export default {
  name: "imageModal",
  props:['image', 'layaout'],
  data(){
    return({
      showModal: false,
      cardDimensions: {
        //display: "block",
        width: this.layaout.width + "px",
        height: this.layaout.height + "px",
        marginTop: 10 + 'px',
        marginLeft: 10 +'px',
        backgroundImage: `url('${this.image.media_attachments[0].preview_url}')`,
        backgroundSize: 100+'% ' +  100 + '%'
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
.cell{
  flex-grow: 1;
}
</style>
