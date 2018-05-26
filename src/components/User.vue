<template id="userView">
  <Layout>
    <div class="loading" v-if="loading">
        Loading...
    </div>

    <div v-else-if='user' class="user-info">
      <h1>{{user.preferredUsername}}</h1>
      <p>Followers: {{user.followers_count}}</p>
      <p>Following: {{user.following_count}}</p>
    </div>
  </Layout>
</template>

<script type="text/javascript">

  import Layout from './layouts/mainLayout.vue'

  import axios from 'axios'

  export default {
    name: 'UserProfile',
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
          console.log(response.data)
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
