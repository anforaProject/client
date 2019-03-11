<template lang="html">
    <div class="home-card ma-0" v-if="image.media_attachments.length !== 0">
        <v-card >
            
            <v-layout                
                align-content-start
            >
                <v-flex>
                    <v-avatar>
                        <img
                            :src="image.account.avatar"
                            :alt="image.account.username"
                        >
                    </v-avatar>

                    

                </v-flex>
            </v-layout>

            <!-- <Carousel :media_data="image.media_attachments"/> -->
            <tiny-slider :mouse-drag="true" :loop="false" items="2" gutter="20">
                <div v-for="(image, index) in image.media_attachments" :key="index">
                    <img :src="image.url">
                </div>
            </tiny-slider>

            <v-card-actions>
                <v-spacer></v-spacer>


                <v-btn icon v-if="image.favourited" @click="dislikeStatus">
                <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon v-else @click="likeStatus">
                <v-icon >favorite_border</v-icon>
                </v-btn>

                <v-btn icon dark v-on:click="dialog = !dialog">
                <v-icon>chat_bubble_outline</v-icon>
                </v-btn>

                <v-dialog v-model="dialog" scrollable>
                    <v-card>
                        <v-card-title>Comments</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                        <p v-for="(comment, i) in image.comments" :key="i">
                            @{{comment.account.username}}: {{comment.message}}
                        </p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


                <v-btn icon v-if="is_owner" @click="deleteStatus">
                <v-icon>delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script type="text/javascript">
import zinatAPI from '../../utils/zinatjs/serverConnection.js'
import Carousel from './carousel.vue'

export default {
  name: "imageModal",
  props:['image', "userProfile"],
  components:{
      Carousel
  },
  data(){
    return({
        playing: false,
        comments: this.image.comments,
        comment: '',
        dialog: false,
        dialogm1: '',
        carouselHeight: 0,
    })
  },
  computed:{
    user(){
        return this.$store.getters['profiles/currentAccount']  
    },
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

<style lang="scss" scoped>
    .home-card{
        margin-bottom: 2em;
    }
</style>
