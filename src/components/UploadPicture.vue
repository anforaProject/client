<template id="mainView">
<div>

<div class="step-header">
  <div class="perv-step"><a class="button" @click="prevStep()">Previous</a></div>
  <div class="next-step"><a class="button" @click="nextStep()">Next</a></div>
</div>

<section v-if="step==1" class="is-fullheight hero" id="first-step">
    <div class="upload">
          <b-field>
            <b-upload v-model="drop_area"
                multiple
                drag-drop
                v-on:input="attachListener()">
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon
                                icon="upload"
                                size="is-large"
                                class="upload-icon">
                            </b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                    </div>
                </section>
            </b-upload>
        </b-field>

        <div class="tags">
            <div v-for="(file, index) in drop_area"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </div>
        </div>
    </div>
</section>

<section v-if="step==2" class="columns container is-fluid">
  <div class="column is-2 aside hero is-fullheight upload-column">
    
    <div class="compose has-text-centered">
      <div v-for="(image, index) in files" v-bind:key="index">
        <img class="preview" @click="swap_selected(image.name)" :src="image.prev">
      </div>
    </div>

  </div>

  <div class="column is-5 is-offset-1 aside" v-if="previewing">
    <Preview :previewing="previewing" :filter="files[selected_file].filter"></Preview>
  </div>

  <div class="column is-3 is-offset-1  aside is-fullheight upload-column">
    
    <div class="field" v-if="selected_file !== null">
      <label class="label">Description of the image</label>
      <div class="control">
        <textarea class="textarea" placeholder="Textarea" v-model="files[selected_file].description"></textarea>
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
    
  </div>
</section>

<section v-if="step==3" class="is-fluid">

      <div class="columns">
        
        <div class="column is-3 is-offset 3">
                <div class="field">
                <label class="checkbox">
                  <input type="checkbox" id="checkbox" v-model="publicImage">
                  Make public
                </label>  
        </div>

        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" v-model="message" placeholder="Textarea"></textarea>
          </div>
        </div>



        </div>

        <div class="column is-2 is-offset-5">
            <a class="button is-danger is-block is-bold" @click="performPost" :disabled="freeze" >
              <span v-if="freeze" class="compose">Uploading</span>
              <span v-else="" class="compose">Share</span>
            </a>
        </div>
      </div>
    

    
</section>
</div>
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
          uploaded: false
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

    async uploadMedia(){
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

        resolve()
      })

    },

    performPost(){
      let token = this.user.token
      this.freeze = true

      // Upload the media_files
      self = this


      this.uploadMedia().then(()=>{
        let md = []
        for (let i = 0; i < self.media_ids.length; i++){
          md.push(self.media_ids[i])
        }
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

.step-header{
  display: flex;
  justify-content: space-around;
}

.upload{
  display: flex;
  align-self: center;
  flex-direction: column;
}

.upload-column{
    padding-top: 4em;
}

.mdi-upload{
  color:red !important;
}

#customdropzone{
  display: flex;
  align-self: center;
  text-align: center;
}

#first-step{
  display:flex;
}


</style>
