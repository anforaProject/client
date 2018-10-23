<template>
  <div v-if="rel">
  <button class="button is-primary is-fullwidth" v-if="this.rel.following" @click="unFollowuser(profile)">following</button>
  <button class="button is-primary is-fullwidth" v-else @click="followuser(profile)">follow</button>
  </div>
</template>

<script>
  import zinatAPI from '../../utils/zinatjs/serverConnection.js'
  import { mapGetters } from "vuex"
  export default {
    props:['user', 'profile'],
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters('relationships', ['getRelation'])
    },
    mounted(){
        let rel = undefined

        if(rel === undefined){
          zinatAPI.retriveRelationship(this.user.token,this.profile.id)
          .then(response=>{
            console.log(response.data)
            this.$store.commit('relationships/addAccount', response.data)  
            this.rel = response.data
          })
          .catch(e=>{
            console.log(e)
          })
        }
        else{
          this.rel = rel
        }
    },
    data() {
      return {
        rel:undefined
      };
    },
    methods: {
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
