<template lang="html">
  <div  class="cell" >
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">

              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <img :src="image.media_attachments[0].url" :alt="image.description" class="image">
                <p>{{image.caption}}</p>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <a href="#">@user</a>
                <button class="modal-default-button" @click="change()">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <img :src="image.media_attachments[0].preview_url" alt="" @click="change()">
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
        display: "block",
        width: this.layaout.width + "px",
        height: this.layaout.height + "px",
        marginLeft: this.layaout.left + "px",
      }
    })
  },
  methods:{
    change(){
      this.showModal = !this.showModal
    }
  }
}

</script>

<style media="screen">

</style>
