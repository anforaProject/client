<template lang="html">
    <div class="card home-card">
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
        <div class="card-image">
            <figure class="image ">
                <img :src="image.media_attachments[0].url" alt="Placeholder image">
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
                        <a @click></a>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <a href="">
                                <i class="material-icons">chat_bubble_outline</i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="level-right">
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
</template>

<script type="text/javascript">
import zinatAPI from '../../utils/zinatjs/serverConnection.js'

export default {
  name: "imageModal",
  props:['image', "userProfile"],
  data(){
    return({
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
          zinatAPI.likeStatus(this.image.id, this.user.token).catch(e=>{
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
            zinatAPI.dislikeStatus(this.image.id, this.user.token).catch(e=>{
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


</style>