<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name: 'Anfora',
  state:{

  },
  computed: {
    ...mapState({
      theme: (state) => {
        return {
          '--theme-background-color': state.preferences.theme.background_color,
          '--theme-selected-background-color': state.preferences.theme.selected_background_color,
          '--theme-navbar-color': state.preferences.theme.navbar_color,
          '--theme-primary-color': state.preferences.theme.primary_color,
          '--theme-secondary-color': state.preferences.theme.secondary_color,
        }
      }
    })
  }
}


</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
    html{
    --theme-background-color: #ffffff;
    --theme-selected-background-color: #f2f6fc;
    --theme-navbar-color: #4a5664;
    --theme-primary-color: #303133;
    --theme-secondary-color: #909399;

    $background: var(--theme-background-color);
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";


</style>
