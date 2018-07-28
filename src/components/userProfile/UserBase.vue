<template id="userView">
  <Layout>
    
    <section class="hero is-primary" v-if="user">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-1 is-offset-1">
            <div class="container content">
              <img :src="user.avatar" class="image-circle is-vertical-center" alt="" v-bind:style="{width:100 + 'px', height:100 + 'px', }">
            </div>
          </div>
          <div class="column is-6">
            <h1 class="title data">{{user.name}}</h1>
            <h3 class="subtitle data" v-bind:style="{paddingLeft:1.25 + 'em'}">{{user.username}}</h3>
            <router-link class="button is-primary is-large" :to="{name:'profile.followers',params:{id:user.id}}">{{user.followers_count}} followers</router-link>
            <router-link class="button is-primary is-large" :to="{name:'profile.following',params:{id:user.id}}">{{user.following_count}} following</router-link>
          </div>
        </div>
        <div class="container content columns">
          <div class="column is-6 is-offset-3">
            {{user.note}}
          </div>
        </div>
      </div>
    </section>
    <section class="is-fluid">
          <UserPhotos></UserPhotos>
    </section>  
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
