<template id="mainView">
  <Layout>

    <div id="upload form">
      <picture-input
      width="600"
      height="200"
      margin="16"
      :custom-strings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Drag or click to upload a photo 😃'
      }"
      ></picture-input>

      <textarea name="description" rows="8" cols="60"></textarea>
      
      <input type="checkbox" id="checkbox" v-model="location">
      <label for="checkbox" v-if="checked">Clean location</label>
      <label for="checkbox" v-else>Share location</label>
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
      location:false
    }
  }
}
</script>

<style media="screen">


</style>
