<template id="mainView">
<section class="columns is-fluid">
  <div class="column is-2 aside hero is-fullheight upload-column">
    
    <div class="compose has-text-centered">
      <a class="button is-danger is-block is-bold" @click="performPost" :disabled="freeze">
        <span v-if="freeze"class="compose">Uploading</span>
	<span v-else="freeze"class="compose">Upload</span>
      </a>
    </div>
    
  </div>
  <div class="column is-10 aside is-fullheight upload-column">
    
    <div class="field">
      <label class="label">Image</label>
      <div class="file has-name">
        <label class="file-label">
          <input type="file" ref="files" value="" v-on:change="handleFilesUpload()">
          
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
	    nsfw:false,
	    publicImage: true,
	    description: '',
	    message: '',
	    files:[],
	    freeze: false
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
	    this.freeze = true
	    zinatAPI.uploadMedia(data, token).then(
		response =>{
		    var data = {
			"visibility": this.public,
			"status": this.message,
			"sensitive": this.nsfw,
			"media_ids": response.data.id
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
		}
	    )

	    this.freeze = true
	}
    }
}
</script>

<style media="screen">

.upload-column{
    padding-top: 4em;
}



</style>
