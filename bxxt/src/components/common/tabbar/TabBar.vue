<template>
  <router-link class="tab-bar">
    <slot></slot>
  </router-link>
</template>

<script>

export default {
  name: "TabBar",
}
</script>

<style scoped lang="scss">
 .tab-bar {
   flex: 1;
   text-align: center;
   height: 50px;
   font-size: var(--font-size);
 }

</style>