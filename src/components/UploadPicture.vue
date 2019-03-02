<template id="mainView">
<v-container grid-list-md text-xs-center>
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
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="step = 2"
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="step = 3"
        >
          Continue
        </v-btn>

        <v-btn flat
          @click="step = 1"
        >
          Previous
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
          @click="step = 1"
        >
          Continue
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
            resolve()
          })
          .catch(e=>{
            self.freeze = false
            console.log(e)
            reject(e)
          })
        }

        
      })

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
    
    attachListener() {
          

      let drop = this.drop_area
      for(let i = 0; i < drop.length; i++){
        if (this.files[drop[i].name] === undefined ){
          this.getBase64(drop[i]).then( pr => {

            let data = {name: drop[i].name, file: drop[i], description: "", filter:"cascade", prev: pr}
            this.files[data.name] = data
          })

        }  
      }

      //let data = {file: this.drop_area[i].File, description: "", filter:"cascade"}
      //let token = this.user.token
      //zinatAPI.uploadMedia(data, token).then(response=>{
      //  this.media_ids.push(response.data.id)
      //})

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
    }
  }

}
</script>

<style media="screen" scoped>

</style>
