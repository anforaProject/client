<template lang="html">
    <div class="container" >
        <br class="is-hidden-touch">
        <div             
        v-for="notification in notifications"
        v-bind:key="notification.id"
        >
            <div class="card" v-if="notification.type=='Follow'">
                <header class="card-header">
                    <p class="card-header-title">
                    {{notification.account.username}} followed you
                    </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="material-icons">person_add</i>
                    </span>
                    </a>
                </header>
            </div>
            <div class="card" v-else-if="notification.type=='Like'">
                <header class="card-header">
                    <p class="card-header-title">
                    {{notification.account.username}} liked your status
                    </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="material-icons">favorite</i>
                    </span>
                    </a>
                </header>
                  <div class="card-content">
                        <div class="content">
                        "{{notification.status[0].description}}"
                        <br>
                        <figure class="image is-128x128" v-if="notification.status[0].media_attachments[0].type == 'image'">
                            <img :src="notification.status[0].preview[0]" alt="Placeholder image">  
                        </figure>
                        <time datetime="2016-1-1">{{notification.created_at}}</time>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import zinatAPI from '../utils/zinatjs/serverConnection.js'

export default {
    name: "Notification",
    data(){
        return{
            notifications: [],
        }
    },
    mounted(){
        this.setImages()
    },
    computed:{
        user(){
            return this.$store.getters['profiles/currentAccount']
        }
    },
    methods:{
        setImages(){
            //Create a promise solved after the images are on the client
            zinatAPI.retriveNotifications(this.user.token)
            .then(response=>{
                this.notifications = this.notifications.concat(response.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }
    },
}
</script>

<style lang="css">
</style>
