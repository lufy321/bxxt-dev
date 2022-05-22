<template>
  <div class="nav-bar">
    <div class="left" @click="goback"><slot name="left">&lt;</slot></div>
    <div class="center"><slot>首页</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  name: "navBar",
  setup() {
    const router = useRouter()

    const goback = () => {
      router.go(-1);//返回上一页
    }
    return {
      goback
    }
  }
}
</script>

<style lang="scss" scoped>
  //顶部导航
  .nav-bar {
    display: flex;
    background-color: var(--color-tint);
    color: #FFFFFF;
    position: fixed;//固定定位 顶部
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;//在最上层
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-shadow: 0 2px 0 rgba(100, 100, 100, 0.1);

    .left,.right {
      width: 60px;
    }

    .center {
      flex: 1;// 除掉左右，占全部
    }
  }
</style>