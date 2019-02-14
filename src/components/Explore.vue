<template lang="html">
    <div v-if="ready" id="users" class="container is-fluid is-fullheight" >
        <section class="columns" >
            <div v-for="(profile, index) in show_users" class="column is-one-third" :key="index"  v-if="!isMe(profile)">
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
        <section v-for="index in images.length" :key="index">
            <div class="columns is-fullheight">
                <div v-for="image in images.slice( (index-1)*3, (index-1)*3+3)" class="grid column is-one-third" :key="image.id">
                    <div class="panel">
                        <imageMinature
                        v-bind:image="image"
                        ></imageMinature>
                    </div>
                </div>

                <div v-if="images.slice( (index-1)*3, (index-1)*3+3).length < 3">
                    <div v-for="item in Array(3 - images.slice( (index-1)*3, (index-1)*3+3).length).keys()" class="grid column is-one-third" :key="'n' + item">
                    </div>
                </div>
            </div>
        </section>  
    </div>
</template>

<script>
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
            users:[],
            show_users: [],
            nimages: 0
        }
    },
    mounted(){
        this.setImages().then( () =>{
            this.ready=true
            this.nimages = this.images.length / 3
            
            if (this.images.length % 3 != 0){
                this.nimages += 1;
            }
        })
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
                this.show_users = this.users.slice(0,3)
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

<style lang="scss" scoped>

.grid{
    display: flex;
    justify-content: center;
}

#users{
    margin-top:2em;
}
</style>

