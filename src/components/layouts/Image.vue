<template lang="html">
  <!--
  <div class="cell" v-on:click="displayModal()">
    <div class="modal modal-full-screen modal-fx-fadeInScale" v-bind:class="cravings">
      <div class="modal-background"></div>
      <div class="modal-content is-huge">
        <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="modal-button-close delete" aria-label="close"></button>
        </header>
        <p class="image">
          <img :src="image.media_attachments[0].url">
        </p>
      </div>
    </div>
    
    <div class="image placeholder" v-bind:style="imageHolder"></div>
    
  </div>
  -->
  <div v-on:click="displayModal()">
    <div class="modal modal-full-screen modal-fx-fadeInScale full-image" v-bind:class="cravings">
      <div class="modal-background"></div>
      <div class="modal-card">

        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-10">
              <img :src="image.media_attachments[0].url">
            </div>
            <div class="column is-2">
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
              <p><b>{{image.account.name}}</b> - {{image.description}}</p>
            </div>
          </div>
        </section>
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
.full-image{
  max-height: 100%;
}

.modal {
  max-height: 100%;
}

.placeholder{
  width: 280px;
  height: 280px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}
</style>
