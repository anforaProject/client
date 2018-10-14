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


  @media only screen and (max-width : 768px) {
    html, body {
      max-width: 100%;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }

</style>
