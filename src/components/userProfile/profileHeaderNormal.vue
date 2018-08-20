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
        <p v-if="!isMe(profile)">
          <button class="button is-outlined is-fullwidth" v-if="user.isFollowed" @click="unfollowuser(user)">following</button>
          <button class="button is-primary is-fullwidth" v-else @click="followuser(user)">follow</button>
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
export default {
  props: {
    profile: Object,
  },
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
      return account.id == this.user.id
    }
  },
};
</script>

<style lang="css">
.anfora-avatar img{
    border-radius: 4px;
}
</style>