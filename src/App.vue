<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
    // Set your colors
  $primary: hsl(218, 32%, 46%);

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  ::-webkit-scrollbar {
    display: none;
  }

  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }
</style>
