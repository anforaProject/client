<template id="mainView">
  <Layout>

    <section class="columns is-fluid">
      <div class="column is-2 aside hero is-fullheight upload-column">

        <div class="compose has-text-centered">
            <a class="button is-danger is-block is-bold" @click="performPost">
              <span class="compose">Upload</span>
            </a>
        </div>

      </div>
      <div class="column is-10 aside is-fullheight upload-column">
          <input type="file" ref="files" value="" v-on:change="handleFilesUpload()">

          <div id="upload-form">
            <div class="field">
              <label class="label">Message</label>
              <div class="control">
                <textarea class="textarea" v-model="message" placeholder="Textarea"></textarea>
              </div>
            </div>

            <div class="field">
              <label class="label">Description of the image</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea" v-model="description"></textarea>
              </div>
            </div>

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

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox">
                  I agree to the <a href="#">terms and conditions</a>
                </label>
              </div>
            </div>


          </div>
      </div>
    </section>
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
  computed:{
    user(){
      return this.$store.getters['profiles/currentAccount']
    }
  },
  methods:{
    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;
       /*
         Adds the uploaded file to the files array
       */
       for( var i = 0; i < uploadedFiles.length; i++ ){
         this.files.push( uploadedFiles[i] );
       }
    },

    photoSet(image){
      if(image){
        this.image = image
      }
    },  
    performPost(){
      
      let data = {image: this.files[0], description: this.description}
      let token = this.user.token
      zinatAPI.uploadMedia(data, token).then(
        response =>{
          var data = {
            "visibility": this.public,
            "status": this.message,
            "sensitive": this.sfw,
            "media_ids": response.data.id
          }
          zinatAPI.uploadStatus(data, token)
          .then(response => {
            console.log(response)
            //this.$router.push({name:'home'})
          })
          .catch(e => {
            console.log(e)
          })
        }
      )
    }
  }
}
</script>

<style media="screen">

.upload-column{
 padding-top: 4em;
}



</style>
