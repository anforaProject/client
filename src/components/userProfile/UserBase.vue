<template id="userView">
  <Layout>

    <div id="user-grid">
      <div id="user-info">
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-else-if='user'>
          <p id="preferred-Username">{{user.preferredUsername}}</p>

          <div id="account-actions">
            <div class="account-info">
              Settings
            </div>
            <div class="account-info" @click='this.$routes.push()'>
              <span>Followers</span>
              <strong>{{user.followers_count}}</strong>
            </div>
            <div class="account-info">
              <span>Following</span>
              <strong>{{user.following_count}}</strong>
            </div>

          </div>

        </div>

      </div>

      <div id="user-posts">
        <router-view></router-view>
      </div>

    </div>
  </Layout>
</template>

<script type="text/javascript">

  import Layout from '../layouts/mainLayout.vue'

  import axios from 'axios'

  export default {
    name: 'UserBase',
    components: {Layout},
    data(){
      return{
        loading: true,
        errors: [],
        user: null
      }
    },
    created(){
      this.retriveUser()
    },
    watch:{
      '$route': 'retriveUser'
    },
    methods:{
      retriveUser(){
        axios.get('http://localhost:8000/@'+this.$route.params.username)
        .then(response =>{
          // JSON responses are automatically parsed.
          this.user = response.data
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
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
    width: 100%;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-auto-rows: 100%;
  }

  #user-info{
    padding-left: 1em;

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
