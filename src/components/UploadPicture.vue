<template id="mainView">
  <Layout>


      <input type="file" ref="files" value="" v-on:change="handleFilesUpload()">

      <div id="upload-form">

        <label for="message">Message:</label>
        <textarea name="message" id="description" v-model="message" rows="8" cols="60"></textarea>

        <label for="description">Description of the image</label>
        <textarea name="description" id="description" v-model="description" rows="8" cols="60"></textarea>

        <div id="location">
          <input type="checkbox" id="checkbox" v-model="location">
          <label for="checkbox" v-if="location">Location will be shared if present</label>
          <label for="checkbox" v-else>Location will be removed</label>

          <input type="checkbox" id="checkbox" v-model="sfw">
          <label for="checkbox" v-if="sfw">Content is safe</label>
          <label for="checkbox" v-else>Content may not be sfw</label>

          <input type="checkbox" id="checkbox" v-model="publicImage">
          <label for="checkbox" v-if="publicImage">Image will be public</label>
          <label for="checkbox" v-else>Only your followers can see this photo</label>
        </div>

        <button id="send" type="button" name="button" @click="performPost">Post</button>

      </div>
  </Layout>
</template>

<script type="text/javascript">
import Layout from './layouts/mainLayout.vue'
import zinatAPI from '../utils/zinatjs/serverConnection.js'


export default {
  name: 'Upload',
  components: {
    Layout,
  },
  data(){
    return{
      location:false,
      sfw:true,
      publicImage: true,
      description: '',
      message: '',
      files:[]
    }
  },
  methods:{
    photoSet(image){
      if(image){
        this.image = image
      }
    },

    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;
       /*
         Adds the uploaded file to the files array
       */

       for( var i = 0; i < uploadedFiles.length; i++ ){
         this.files.push( uploadedFiles[i] );
       }
    },

    performPost(){
      var data = {
        "public": this.public,
        "message": this.message,
        "description": this.description,
        "sensitive": this.sfw,
        "image": this.files[0]
      }

      console.log(this.files[0])

    zinatAPI.uploadPicture(data)
    .then(response => {
      console.log(response)
      //this.$router.push({name:'home'})
    })
    .catch(e => {
      console.log(e)
    })

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
