<template id="userView">
    <div class="section">
      <div class="container">
        <div class="columns" v-if="profile">
          <div class="column is-one-third">
            <div class="is-hidden-mobile">
              <profileHeaderNormal :profile="profile"></profileHeaderNormal>
            </div>
            <div class="is-hidden-tablet">
              <profileHeaderMobile :profile="profile"></profileHeaderMobile>
            </div>
          </div>
          <div class="column is-two-thirds">
              <div class="columns">
                <div class="column level is-mobile">
                  <router-link :to="{ name: 'profile', params: { id: profile.id } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ profile.statuses_count }}</p>
                      <p>Statuses</p>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'profile/following', params: { id: profile.id } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ profile.following_count }}</p>
                      <p>Following</p>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'profile/followers', params: { id: profile.id } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ profile.followers_count }}</p>
                      <p>Followers</p>
                    </div>
                  </router-link>
              </div>
            </div>

            <div class="columns">
              <div class="column level is-mobile">
                <router-view :profile="profile"></router-view>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </template>

<script type="text/javascript">

  import Layout from '../layouts/mainLayout.vue'
  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import UserPhotos from './UserPhotos.vue'
  import profileHeaderNormal from './profileHeaderNormal.vue'
  import profileHeaderMobile from './profileHeaderMobile.vue'
  //import axios from 'axios'

  export default {
    name: 'UserBase',
    components: {Layout, UserPhotos, profileHeaderNormal, profileHeaderMobile},
    data(){
      return{
        loading: true,
        profile: null
      }
    },
    mounted(){
      this.retriveUser()
    },
    computed:{
      user(){
        return this.$store.getters['profiles/currentAccount']
      }

    },
    watch:{
      '$route': 'retriveUser'
    },
    methods:{
      retriveUser(){
        zinatAPI.retriveUser(this.$route.params.id)
        .then(response=>{
          this.loading = false
          this.profile = response.data
          this.profile.isFollowed=false
        })
        .catch(e=>{
          console.log(e)
        })
      }

    }
  }
</script>

<style media="screen">

.is-vertical-center {
  display: flex;
  align-items: center;
}

.image-circle {
  border-radius: 4px;
}


.data {
  padding-left: 0.75em;
}
</style>
