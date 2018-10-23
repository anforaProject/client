<template lang="html">
    <div >
        <div v-if="ready" >
            <section class="container" >
                <div v-for="profile in users" class="column is-one-third" :key="profile.id"  v-if="!isMe(profile)">
                    <div class="panel is-centered" >
                        <div class="card">
                            <div class="card-content columns">
                                <div class="column is-two-third">
                                    <p class="title">
                                    
                                    <router-link :to="{ name: 'profile', params: { id: profile.id }}">{{profile.name}}</router-link>
                                    </p>
                                    <p class="subtitle">
                                    @{{profile.username}}
                                    </p>
                                </div>
                                <div class="column is-one-third">
                                    <div class="image is-1by1 anfora-avatar">
                                        <img :src="profile.avatar" />
                                    </div>
                                </div>  
                            </div>
                            <footer class="card-footer">
                                <p class="card-footer-item">
                                <span>
                                    <followButton
                                    v-bind:user="user"
                                    v-bind:profile="profile">
                                    </followButton>
                                </span>
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </section>
            <section class="columns">
                <div v-for="image in images" class="column is-one-third" :key="image.id">
                    <div class="panel">
                        <imageMinature
                        v-bind:image="image"
                        ></imageMinature>
                    </div>
      </div>
            </section>  
        </div>
    </div>
</template>

<script>
import {login} from '../utils/auth';
import imageMinature from './layouts/Image.vue'
import zinatAPI from '../utils/zinatjs/serverConnection.js'
import followButton from './userProfile/followButton.vue'


export default {
    name: "explore",
    components: {imageMinature, followButton},
    data(){
        return{
            ready: false,
            images: [],
            users:[]
        }
    },
    mounted(){
        this.setImages().then( () =>this.ready=true)
    },
    computed:{
        user(){
            return this.$store.getters['profiles/currentAccount']
        }
    },
    methods:{
        setImages(){
            //Create a promise solved after the images are on the client
            return new Promise((resolve) => {
            zinatAPI.explore()
            .then(response=>{
                //this.ready = true 
                this.images = this.images.concat(response.data.statuses)
                this.users = this.users.concat(response.data.users)
                resolve()
                })
            })
            .catch(e=>{
                console.log(e)
            })
        },

        isMe(account){
            return account.id == this.user.id
        }   
    },
}
</script>

<style lang="css">
</style>
