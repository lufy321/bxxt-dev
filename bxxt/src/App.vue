<template>
  <router-view :key="$router.fullPath"/>
  <main-tabber/>
</template>

<script>
  import MainTabber from "components/content/maintabber/MainTabber"

  export default {
    name: 'App',
    components: {
      MainTabber
    }
  }
</script>

<style lang="scss">
  @import "assets/css/base.css";
</style>
