<template lang="html">
  <div class="">
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
                <img :src="image.media_url" :alt="image.description" class="image">
                <p>{{image.message}}</p>
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
    <img :src="image.preview_url" alt="" @click="change()" class="preview">
  </div>

</template>

<script type="text/javascript">
export default {
  name: "imageModal",
  props:['image'],
  data(){
    return({
      showModal: false
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
.status-card{
  border: 1px solid;
  place-self: center;
}

.preview {
    max-width:320px;
    max-height:320px;
    width:auto;
    height:auto;
}


.image{
  max-width: 50%;
  width: auto;
  height: auto;
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
  width: 40%;
  max-height: 90%;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  width: 100%;
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
