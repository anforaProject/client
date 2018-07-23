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

    <img v-bind:style="cardDimensions" :src="image.media_attachments[0].preview_url" alt="" @click="change()" class="preview">
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
        width: this.layaout.width*4,
        height: this.layaout.height,
        marginLeft: this.layaout.left,
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

.cell img{
  display: block;
}

.status-card{
  max-width: 100%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: 100%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  width: 90%;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
