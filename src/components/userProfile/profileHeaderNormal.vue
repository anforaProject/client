<template>
  <!-- Optimised for use on mobile sizes -->
  <div v-if="profile">
    <div class="columns is-mobile">
      <div class="column">
        <div class="image is-1by1 anfora-avatar">
          <img :src="profile.avatar" />
        </div>
      </div>
      <div class="column is-two-thirds">
        <h1 class="title is-bold">
          {{ profile.name }}
        </h1>
        <p v-if="user">
          <followButton
          v-bind:user="user"
          v-bind:profile="profile">
          </followButton>
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p>
          <span class="subtitle">
            <small>{{ profile.note }}</small>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import followButton from './followButton.vue'

  export default {
    props: {
      profile: Object,
    },
    components: {followButton},
    computed:{
      user(){
        return this.$store.getters['profiles/currentAccount']
      }

    },
    data() {
      return {
      };
    },
    methods: {
      isMe(account){
        return account && account.id == this.user.id
      },

      followuser(user){
        zinatAPI.followUser(this.user.token, user.id)
        .then(response=>{
          this.profile.isFollowed = true
        })
        .catch(e=>{
          console.log(e)
        })
      },

      unFollowuser(user){
        zinatAPI.unFollowUser(this.user.token, user.id)
        .then(response=>{
          this.profile.isFollowed = false
        })
        .catch(e=>{
          console.log(e)
        })
      }
    },
  };
</script>

<style lang="css">
.anfora-avatar img{
    border-radius: 4px;
}
</style>