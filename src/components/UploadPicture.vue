<template id="mainView">
<v-container fluid>
 <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <input type="file" :accept="accept" :multiple="multiple" :disabled="disabled"
           ref="fileInput" @change="onFileChange">

        <v-divider></v-divider>

        <v-btn
          color="primary"
          @click="step = 2"
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2" grid-list-md>
        <v-layout row wrap>
          <v-flex xs4>
            <v-img  v-for="(image, index) in files" v-bind:key="index" class="preview" @click="swap_selected(image.name)" :src="image.prev" width="40%"></v-img>
          </v-flex>
          <v-flex xs4>
            <v-img v-if="previewing" :src="previewing" width="80%"></v-img>
          </v-flex>
          <v-flex xs4>
            <v-text-field v-if="previewing"
              v-model="files[selected_file].description"
              color="blue darken-2"
              label="Image description"
            ></v-text-field>
          </v-flex>
        </v-layout>
        
        <v-btn flat
          @click="step = 1"
        >
          Previous
        </v-btn>
        <v-btn
          color="primary"
          @click="step = 3"
        >
          Continue
        </v-btn>


      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn flat
          @click="step = 2"
        >
          Previous
        </v-btn>
        <v-btn
          color="primary"
          @click="performPost()"
        >
          Upload
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-container>
</template>

<script type="text/javascript">

// Handle media upload

import Layout from './layouts/mainLayout.vue'
import zinatAPI from '../utils/zinatjs/serverConnection.js'
import Preview from './pictures/preview.vue'

/*
  How this works.
  -On the left panel you upload images. Then a event listener is added 
  to every image. We store a hashmap with the filename -> {file, description}.
  in the "files" objects. 
  
  -selected_file is the current file. What it changes is the big preview and 
  the description model so you can change the description and apply filters
*/


export default {
    name: 'Upload',
    components: {
      Layout,
      Preview,
    },
    data(){
      return{
          location:false, // True if the user wants to store image location
          nsfw:false, // True if the image is nsfw
          publicImage: true, // True if the image should be public
          message: '',
          selected_file: null,
          files:{}, // Files stored to upload,
          drop_area: [],
          public: true, 
          media_ids: [], // Array of media_ids returned by the server
          freeze: false,
          previewing: null, // The base64 for the image that we are previewing
          dropzoneOptions: {
            url: 'https://httpbin.org/post',
            thumbnailWidth: 150,
            maxFilesize: 10,
            headers: { "My-Awesome-Header": "header value" },
          },


          step:1,
          uploaded: false,
          multiple: true,
          disabled: false,
          accept:'*'
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

    uploadMedia(){
      let token = this.user.token
      let self = this

      return new Promise(function(resolve, reject){
        for (let key in self.files){
          
          let data = {
            image: self.files[key].file, 
            description: self.files[key].description
          }

          zinatAPI.uploadMedia(data, token).then(response=>{
            self.media_ids.push(response.data.id)
            
          })
          .catch(e=>{
            self.freeze = false
            console.log(e)
            reject(e)
          })
        }

        while(this.media_ids.length !== this.files.length){
          console.log(this.media_ids.length , this.files.length)
        }
        resolve()

        
      })

    },

    
    sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    },

    add_media(){ 
      let self = this 

      return new Promise(function(resolve, reject){
        let md = []
        for (let i = 0; i < self.media_ids.length; i++){
          md.push(self.media_ids[i])
        }
        resolve(md)
      })
      
    },

    performPost(){
      let token = this.user.token
      this.freeze = true

      // Upload the media_files
      let self = this


      this.uploadMedia().then(()=>{
        self.add_media().then(md =>{
          var data = {
            "visibility": self.public,
            "status": self.message,
            "sensitive": self.nsfw,
            "media_ids": md
          }
          zinatAPI.uploadStatus(data, token)
          .then(() => {
              //console.log(response)
              //this.$router.push({name:'home'})
              self.$toast.open({
              message: 'Image uploaded correctly!',
              type: 'is-success'
              })
              
              self.$router.push("/home")
          })
          .catch(e => {
              console.log(e)
              self.$toast.open({
              message: `oh no! We couldn't upload your image :(`,
              type: 'is-danger'
              })
              self.freeze = false
          })
        })

      })
    },

    swap_selected: function(file_name){
      this.selected_file = file_name
      
      this.previewing = this.files[file_name].prev
    },

    getBase64: function(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    deleteDropFile(index) {
        let name = this.drop_area[index].name
        this.drop_area.splice(index, 1)
        delete this.files[name]
    },

    // ---------------------
    // State of the upload
    // ---------------------

    nextStep(){
      this.step += 1;
    },

    prevStep(){
      this.step -= 1;
      if (this.step < 1)
        this.step = 1;
    },

    // ---------------------
    // Triggered when the user uploads something
    // ---------------------

    getFormData (files) {
      const forms = []
      for (const file of files) {
        const form = new FormData()
        form.append('data', file, file.name)
        forms.push(form)
      }
      return forms
    },

    onFileChange ($event) {
        const files = $event.target.files || $event.dataTransfer.files
        const form = this.getFormData(files)
        if (files) {
          if (files.length > 0) {

            for(let i = 0; i < files.length; i++){
              let file = files[i]
              if (this.files[file.name] === undefined ){
                this.getBase64(file).then( pr => {

                  let data = {name: file.name, file: file, description: "", filter:"cascade", prev: pr}
                  this.files[file.name] = data
                })

              }  
            }
          }
        } else {
          this.filename = $event.target.value.split('\\').pop()
        }
      }
  }

}
</script>

<style media="screen" scoped>

</style>
