<template lang="html">
  <div id="app">
    <img :src="image.preview_url" alt="">
    <p>{{image.message}}</p>
    <p>{{image.description}}</p>
  </div>
</template>

<script>
export default {
  name: "imageTemplate",
  props:['image']
}
</script>

<style lang="css">
</style>
