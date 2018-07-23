<template id="userView">
  <Layout>

    <div id="user-grid">
      <div id="user-info">
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-else-if='user'>
          <p id="preferred-Username">{{user.username}}</p>

          <div id="account-actions">
            <div class="account-info">
              <span>{{$t("profiles.posts")}}</span>
              <strong>{{user.statuses_count}}</strong>
            </div>
            <div class="account-info" @click='followersTab()'>
              <span>{{$t("profiles.followers")}}</span>
              <strong>{{user.followers_count}}</strong>
            </div>
            <div class="account-info" @click='followingTab()'>
              <span>{{$t("profiles.following")}}</span>
              <strong>{{user.following_count}}</strong>
            </div>

          </div>

        </div>

      </div>
      <div id="user-posts">
        <UserPhotos></UserPhotos>
      </div>


    </div>
  </Layout>
</template>

<script type="text/javascript">

  import Layout from '../layouts/mainLayout.vue'
  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import UserPhotos from './UserPhotos.vue'
  //import axios from 'axios'

  export default {
    name: 'UserBase',
    components: {Layout, UserPhotos},
    data(){
      return{
        loading: true,
        errors: [],
        user: null
      }
    },
    mounted(){
      this.retriveUser()
    },
    watch:{
      '$route': 'retriveUser'
    },
    methods:{
      retriveUser(){
        zinatAPI.retriveUser(this.$route.params.id)
        .then(response=>{
          this.loading = false
          this.user = response.data
        })
        .catch(e=>{
          console.log(e)
        })
      }

    }
  }
</script>

<style media="screen">
/* Custom, iPhone Retina */
@media only screen and (min-width : 320px) {

}

/* Extra Small Devices, Phones */
@media only screen and (min-width : 480px) {

}

/* Small Devices, Tablets */
@media only screen and (min-width : 768px) {

}

/* Medium Devices, Desktops */
@media only screen and (min-width : 992px) {

  .account-info{
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;
  }

  #user-grid{
  }

  #user-info{
    padding-left: 1em;
    margin-bottom: 1em;
  }

  #preferred-Username{
    font-size: 180%;
  }

  #account-actions{
    border: 1px;
    display: grid;
    grid-template-columns: repeat(4, 15%);
    grid-auto-rows:100%;
    grid-column-gap: 1em;
  }



}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {

}

</style>
