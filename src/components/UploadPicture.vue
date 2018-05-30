<template id="mainView">
  <Layout>


      <picture-input
      id="upload"
      width="600"
      height="200"
      margin="16"
      :custom-strings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Drag or click to upload a photo 😃'
      }"
      ></picture-input>

      <div id="upload-form">

        <textarea name="description" id="description" rows="8" cols="60"></textarea>

        <div id="location">
          <input type="checkbox" id="checkbox" v-model="location">
          <label for="checkbox" v-if="location">Location will be shared if present</label>
          <label for="checkbox" v-else>Location will be removed</label>

          <input type="checkbox" id="checkbox" v-model="cw">
          <label for="checkbox" v-if="cw">Content is safe</label>
          <label for="checkbox" v-else>Content may not be sfw</label>
        </div>

        <button id="send" type="button" name="button" @click="perform-post">Post</button>

      </div>
  </Layout>
</template>

<script type="text/javascript">
import Layout from './layouts/mainLayout.vue'
import PictureInput from 'vue-picture-input'

export default {
  name: 'Upload',
  components: {
    Layout,
    PictureInput
  },
  data(){
    return{
      location:false,
      cw:true
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

#upload-form{
  margin-top: 1em;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
}

#description{
  width: 600px;
  margin: auto;
}

#location{
  padding-top: 1em;
  margin: auto;
}

#send{
  margin: auto;
  margin-top: 1em;
  max-width: 10%;
}

}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {

}

</style>
