<template id="userView">
  <Layout>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="is-hidden-mobile">
              <profileHeaderNormal :user="user"></profileHeaderNormal>
            </div>
            <div class="is-hidden-tablet">
              <profileHeaderNormal :user="user"></profileHeaderNormal>
            </div>
          </div>
          <div class="column is-two-thirds">
            <div class="columns">
              <div class="column level is-mobile">
                <UserPhotos></UserPhotos>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    
  </Layout>
</template>

<script type="text/javascript">

  import Layout from '../layouts/mainLayout.vue'
  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import UserPhotos from './UserPhotos.vue'
  import profileHeaderNormal from './profileHeaderNormal.vue'
  //import axios from 'axios'

  export default {
    name: 'UserBase',
    components: {Layout, UserPhotos, profileHeaderNormal},
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

.is-vertical-center {
  display: flex;
  align-items: center;
}

.image-circle {
  border-radius: 50%;
}


.data {
  padding-left: 0.75em;
}
</style>
