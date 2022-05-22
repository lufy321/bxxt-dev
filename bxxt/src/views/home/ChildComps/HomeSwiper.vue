<template>
  <div class="home-swiper">
    <van-swipe class="swiper" :autoplay="3000" lazy-render indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="item" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.swiper {
  height: 235px;
}

img {
  height: 100%;
  width: 100%;
}
</style>