<template>
  <!-- Optimised for use on mobile sizes -->
  <div v-if="user">
    <div class="columns is-mobile">
      <div class="column">
        <div class="image is-1by1 anfora-avatar">
          <img :src="user.avatar" />
        </div>
      </div>
      <div class="column is-two-thirds">
        <h1 class="title is-bold">
          {{ user.name }}
        </h1>
        <p v-if="!user.isMe">
          <button class="button is-outlined is-fullwidth" v-if="user.isFollowed" @click="unfollowuser(user)">following</button>
          <button class="button is-primary is-fullwidth" v-else @click="followuser(user)">follow</button>
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p>
          <span class="subtitle">
            <small>{{ user.note }}</small>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="css">
.anfora-avatar img{
    border-radius: 50%;
}
</style>