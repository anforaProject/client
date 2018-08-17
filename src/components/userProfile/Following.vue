<template id="userView">
  <div class="profile-collection">
    <div class="columns is-mobile">
      <div class="column" v-if="following">
          <article class="media" v-for="person in following" :key="person.id">
            <figure class="media-left">
              <p class="image is-64x64 sui-avatar">
                <img :src="person.avatar" />
              </p>
            </figure>
            <div class="media-content ">
              <div class="content max-lines--one-plus-three">
                <p>
                  <router-link :to="{ name: 'profile', params: { id: person.id }}">
                    <strong>{{ person.name }}</strong>
                  </router-link>
                  <br />
                  <span>
                    {{ person.note }}
                  </span>
                </p>
              </div>
            </div>
            <div class="media-right">
              <br />
              <template v-if="!person.isMe">
                <button class="button is-outlined" v-if="person.isFollowed" @click="unfollowPerson(person)">following</button>
                <button class="button is-primary" v-else @click="followPerson(person)">follow</button>
              </template>
            </div>
          </article>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import Layout from '../layouts/mainLayout.vue'
  import zinatAPI from '../../utils/zinatjs/serverConnection.js'

  export default {
    name: 'Following',
    components: {Layout},
    props:{
      profile: Object
    },
    data(){
      return{
        loading: true,
        errors: [],
        following: null
      }
    },
    created(){
      this.retriveFollwing()
    },
    methods:{
      retriveFollwing(){
        zinatAPI.getFollowing(this.profile.id)
        .then(response=>{
          this.loading = false
          this.following = response.data
          console.log(response)
        })
        .catch(e=>{
          console.log(e)
        })
      }
    }
  }
</script>

<style media="css">

</style>
