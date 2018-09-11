<template lang="html">
    <div class="card home-card">
        <div class="header">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48 image-circle">
                        <img :src="user.avatar" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="columns">
                        <div class="column is-half">
                            <p class="title is-4">{{user.name}}</p>
                            <p class="subtitle is-6">{{user.username}}</p>
                        </div>
                        <div class="column is-half is-vcentered" id="card-button">
                            <button class="button is-pulled-right">
                                <i class="material-icons">more_vert </i>
                            </button>
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
                        <a href="">
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
            </div>

            <div class="content">
                <p>
                    <strong>{{image.likes}} Likes</strong>
                </p>
                <p>{{image.message}}</p>
                <time datetime="2018-1-1">{{image.created_at}}</time>
            </div>
        </div>
        <div class="card-footer">
            <div class="columns is-mobile">
                <div class="column is-12">
                    <div class="field">
                        <div class="control">
                            <input class="input is-medium" type="text" placeholder="Add a comment . . .">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script type="text/javascript">
export default {
  name: "imageModal",
  props:['image', "user"],
  data(){
    return({
    })
  },
  computed:{
  },
  methods:{
  }
}

</script>

<style media="screen">
.home-card {
    margin-top: 3vh;
}

.image-circle img{
    border-radius: 4px;
}

.is-vcentered {
    display: flex;
    align-items: center;
    justify-content: center;
}

#card-button{
    border:none;
}