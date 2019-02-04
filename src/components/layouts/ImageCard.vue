<template lang="html">
    <div  v-if="image.media_attachments[0]">
        <div class="card home-card is-hidden-mobile pic">
            <div class="header">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48 image-circle">
                            <img :src="userProfile.avatar" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="columns">
                            <div class="column is-half">
                                <!--<p class=""><router-link :to="{ name: 'profile', params: { id: userProfile.id }}">{{userProfile.name}}</router-link></p>-->
                                <p class=""><router-link :to="{ name: 'profile', params: { id: userProfile.id }}">@{{userProfile.username}}</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="card-image">
                <figure class="image" v-if="image.media_attachments[0].type === 'image'">
                    <img :src="image.media_attachments[0].url" alt="Placeholder image">  
                </figure>
                <figure v-else>
                    <video ref="video" @click="playVideo()" controls loop>
                        <source  :src="image.media_attachments[0].url"  type="video/mp4">
                    </video>  
                </figure>
            </div>
            <div class="card-content">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item has-text-centered">
                            <a @click="dislikeStatus" v-if="image.favourited">
                                <i class="material-icons">favorite</i>
                            </a>
                            <a @click="likeStatus" v-else>
                                <i class="material-icons">favorite_border</i>
                            </a>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <a href="">
                                    <i class="material-icons">chat_bubble_outline</i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="level-right" v-if="is_owner()">
                        <div class="level-item has-text-centered">
                            <a @click="deleteStatus">
                                <i class="material-icons">delete</i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <p>
                        <strong>{{image.likes}} Likes</strong>
                    </p>
                    <p>{{image.message}}</p>

                    <div v-for="com in comments" v-bind:key="'com'">
                        <strong>{{com.account.username}}</strong> {{com.message}} 
                    </div>
                    <br>
                    <div class="columns comment is-variable is-3">
                        <input class="column is-11 input is-rounded" type="text" v-model='comment' placeholder="Rounded input">
                        <a  v-on:click="postComment()" class="column is-1 send"><i class="material-icons">send</i></a>
                    </div>
                </div>
            </div>
            
        </div>
        <br>
        <div class="home-card is-hidden-desktop pic">
            <div class="header">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48 image-circle">
                            <img :src="userProfile.avatar" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="columns">
                            <div class="column is-half">
                                <p class="title is-4">{{userProfile.name}}</p>
                                <p class="subtitle is-6">@{{userProfile.username}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-image ">
                <figure class="image" v-if="image.media_attachments[0].type == 'image'">
                    <img :src="image.media_attachments[0].url" alt="Placeholder image">  
                </figure>
                <figure v-else>
                    <video ref="video" @click="playVideo()" controls loop>
                        <source  :src="image.media_attachments[0].url"  type="video/mp4">
                    </video>  
                </figure>
            </div>
            <div class="card-content">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item has-text-centered">
                            <a @click="dislikeStatus" v-if="image.favourited">
                                <i class="material-icons">favorite</i>
                            </a>
                            <a @click="likeStatus" v-else>
                                <i class="material-icons">favorite_border</i>
                            </a>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <a href="">
                                    <i class="material-icons">chat_bubble_outline</i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="level-right" v-if="is_owner">
                        <div class="level-item has-text-centered">
                            <a @click="deleteStatus">
                                <i class="material-icons">delete</i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <p>
                        <strong>{{image.likes}} Likes</strong>
                    </p>
                    <p>{{image.message}}</p>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script type="text/javascript">
import zinatAPI from '../../utils/zinatjs/serverConnection.js'

export default {
  name: "imageModal",
  props:['image', "userProfile"],
  data(){
    return({
        playing: false,
        comments: this.image.comments,
        comment: ''
    })
  },
  computed:{
    user(){
        return this.$store.getters['profiles/currentAccount']  
    }
  },
  methods:{
        likeStatus(){
          this.image.favourited = true
          this.image.likes += 1
          zinatAPI.likeStatus(this.image.id, this.user.token).catch(()=>{
            this.$toast.open({
                message: `oh no! We couldn't like the photo :(`,
                type: 'is-danger'
            })
            this.image.favourited = false
            this.image.likes -= 1
          })
        },

        dislikeStatus(){
            this.image.favourited = false
            this.image.likes -= 1
            zinatAPI.dislikeStatus(this.image.id, this.user.token).catch(()=>{
                this.$toast.open({
                    message: `oh no! We couldn't dislike the photo :(`,
                    type: 'is-danger'
                })
                this.image.favourited = true
                this.image.likes += 1
            })
        },

        deleteStatus(){
            
            zinatAPI.removeStatus(this.image.id, this.user.token).then(()=>{
                this.$parent.timeline = this.$parent.timeline.filter(item => item.id !== this.image.id)
            }).catch(()=>{
                this.$toast.open({
                    message: `Opps! Couldn't remove this post.`,
                    type: 'is-danger'
                }) 
            })
        },

        playVideo(){
            console.log(this.$refs)
            if(this.playing){
                this.$refs.video.play();
            }else{
                this.$refs.video.pause();
            }

            this.playing = !this.playing
        },

        is_owner(){
            return this.user.id === this.userProfile.id || false
        },

        postComment(){
            let data = {
                status: this.comment,
                in_reply_to_id: this.image.id
            }

            zinatAPI.uploadComment(data, this.user.token)
            .then(response =>{
                this.comments.push(response.data)
            })
            .catch(e=>{
                console.log(e)
            })

            this.comment = ''
        }
  }
}

</script>

<style media="screen">

.image-circle img{
    border-radius: 4px;
}

.is-vcentered {
    display: flex;
    align-items: center;
    justify-content: center;
}

.send{
    margin-top: -0.5em;
}

.comment{
    padding-top: 1em;
}

.pic{
    max-height: 95%;
}


</style>