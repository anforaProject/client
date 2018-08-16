<template>
  <Layout>
    <div class="columns">
      <div class="column is-2 aside hero">
        <a class="button item active">Profile settings</a>
      </div>
      <div class="column is-3" v-if="user">
        <div class="field">
          <label class="label">Name</label>
          <input class="input" type="text" v-model="user.name">
        </div>
        <div class="field">
          <label class="label">Description</label>
          <textarea class="textarea" v-model="user.note"></textarea>
        </div>
        <div class="field">
          <label class="label">Avatar</label>
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" ref="avatar" v-on:change="handleAvatar()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="material-icons">arrow_upward</i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name" v-if="avatar">
                {{avatar.name}}
              </span>
              <span class="file-name" v-else>
                Upload a file
              </span>
            </label>
          </div>
        </div>

        <div class="field">
          <label class="checkbox">
            <input type="checkbox" v-model="user.locked">
            Make this account private
          </label>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" v-model="user.bot">
            This account is a bot
          </label>  
        </div>
        
        <div class="field">
          <div class="control" >
            <button v-if="updating" class="button is-loading is-link" >Save changes</button>
            <button v-else class="button  is-link" v-on:click="saveData()"> Save changes</button>
          </div>
        </div>

      </div>
    </div>
  </Layout>
</template>

<script>
import zinatAPI from '../utils/zinatjs/serverConnection.js'
import Layout from './layouts/mainLayout.vue'

export default {
  name: "Settings",
  components: {Layout},
  data(){
    return{
      avatar: undefined,
      updating: false
    }
  },
  computed:{
    user(){
      return this.$store.getters['profiles/currentAccount']
    }
  },
  methods:{
    handleAvatar(){
      this.avatar = this.$refs.avatar.files[0]
    },
    saveData(){
      if (!this.updating){
        let data = {
          avatar: this.avatar,
          name: this.user.name,
          note: this.user.note,
          locked: this.user.locked,
          bot: this.user.bot
        }
        this.updating = true
        zinatAPI.updateProfile(data, this.user.token)
        .then(response=>{
          if(response.status == 200){
            let account = response.data
            account.token = this.user.token
            this.$store.commit('profiles/updateCurrentAccount', response.data)
            this.$toast.open({
              message: 'Profile updated correctly!',
              type: 'is-success'
            })
          }
          
        }).catch(()=>{
          this.$toast.open({
            message: `oh no! We couldn't update your profile :(`,
            type: 'is-danger'
          })
        })

        this.updating= false
      }
    }
  }
}
</script>
