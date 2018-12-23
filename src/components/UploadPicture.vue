<template id="mainView">
<section class="columns is-fluid">
  <div class="column is-2 aside hero is-fullheight upload-column">
    
    <div class="compose has-text-centered">
      <a class="button is-danger is-block is-bold" @click="performPost" :disabled="freeze" >
        <span v-if="freeze" class="compose">Uploading</span>
          <span v-else="" class="compose">Upload</span>
      </a>

      <div>
      <vue-dropzone ref="myVueDropzone" 
        id="customdropzone" 
        :options="dropzoneOptions"
        v-on:vdropzone-file-added="attachListener"
        >
      </vue-dropzone>
    </div>
    </div>

  </div>
  <div class="column is-10 aside is-fullheight upload-column">

    <div class="field">
      <label class="label">Image</label>
      <div class="file has-name">
        <label class="file-label">
          <input type="file" ref="files" value="">
          
        </label>
      </div>
    </div>
    
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
    
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" id="checkbox" v-model="location">
        Share location
      </label>  
    </div>
    
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" id="checkbox" v-model="nsfw">
        NSFW content
      </label>  
    </div>
    
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" id="checkbox" v-model="publicImage">
        Make public
      </label>  
    </div>
    
    
  </div>
</section>
</template>

<script type="text/javascript">

// Handle media upload

import Layout from './layouts/mainLayout.vue'
import zinatAPI from '../utils/zinatjs/serverConnection.js'

// Dropzone for image uplad
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'



export default {
    name: 'Upload',
    components: {
      Layout,
      vueDropzone: vue2Dropzone

    },
    data(){
      return{
          location:false, // True if the user wants to store image location
          nsfw:false, // True if the image is nsfw
          publicImage: true, // True if the image should be public
          description: '',
          message: '',
          files:[], // Files stored to upload
          media_ids: [], // Array of media_ids returned by the server
          freeze: false,
          dropzoneOptions: {
            url: 'https://httpbin.org/post',
            thumbnailWidth: 150,
            maxFilesize: 10,
            headers: { "My-Awesome-Header": "header value" },
          }
      }
    },
    computed:{
    user(){
        return this.$store.getters['profiles/currentAccount']
    }
    },
    methods:{

    photoSet(image){
        if(image){
        this.image = image
        }
    },  
    performPost(){
        
      let token = this.user.token
      this.freeze = true
      var data = {
        "visibility": this.public,
        "status": this.message,
        "sensitive": this.nsfw,
        "media_ids": this.media_ids.join(',')
      }
      zinatAPI.uploadStatus(data, token)
      .then(() => {
          //console.log(response)
          //this.$router.push({name:'home'})
          this.$toast.open({
          message: 'Image uploaded correctly!',
          type: 'is-success'
          })
          
          this.$router.push("/home")
      })
      .catch(e => {
          console.log(e)
          this.$toast.open({
          message: `oh no! We couldn't upload your image :(`,
          type: 'is-danger'
          })
      })

      this.freeze = true
    },
    attachListener(file) {
      file.previewElement.addEventListener("click", function() {
        alert("clicked")
      })
      let data = {image: file, description: ""}
      let token = this.user.token
      zinatAPI.uploadMedia(data, token).then(response=>{
        this.media_ids.push(response.data.id)
      })

    }
    }
}
</script>

<style media="screen">

.upload-column{
    padding-top: 4em;
}


</style>
