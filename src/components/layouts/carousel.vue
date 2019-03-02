<template lang="html">
<div>
  <v-img :src='current.url' :alt='current.description'></v-img>
  <v-spacer></v-spacer>
  <div id="arrow" class="text-xs-center" v-if="this.size>1">
    <v-icon v-on:click="prev()">chevron_left</v-icon>
    <v-icon v-on:click="next()">chevron_right</v-icon>
  </div>
</div>
</template>

<script type="text/javascript">

export default {
  name: "imageModal",
  props:['media_data'],
  data(){
    return({

      current_id: 0,
      current: this.media_data[0],
      size: this.media_data.length
    })
  },
  computed:{
    cravings(){
      return this.showModal ? 'is-active' : ''
    }
  },
  methods:{
    prev(){
      this.current_id = (this.current_id -1 + this.size) % size
      this.current = this.media_data[this.current_id]
    },

    next(){
      this.current_id = (this.current_id +1)% size
      this.current = this.media_data[this.current_id]
    }
  }
}

</script>

<style media="scss" scoped>

#arrow > i{
  font-size: 4em !important;
}

</style>
