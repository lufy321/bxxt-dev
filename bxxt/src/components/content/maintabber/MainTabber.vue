<template>
  <div class="main-tabber">
    <tab-bar to="/home">
      <tab-bar-item>
        <template v-slot:item-i>
          <i class="iconfont icon-yemian-copy-copy"></i>
        </template>
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>
    </tab-bar>
    <tab-bar to="/show">
      <tab-bar-item>
        <template v-slot:item-i>
          <i class="iconfont icon-fenlei"></i>
        </template>
        <template v-slot:item-text>
          <div>列表</div>
        </template>
      </tab-bar-item>
    </tab-bar>

    <tab-bar to="/repairs">
      <tab-bar-item>
        <template v-slot:item-i>
          <i class="iconfont icon-fenlei"></i>
        </template>
        <template v-slot:item-text>
          <div>报修</div>
        </template>
      </tab-bar-item>
    </tab-bar>
    <tab-bar to="/profile">
      <tab-bar-item  path="/profile">
        <template v-slot:item-i>
          <i class="iconfont icon-gerenzhongxin1"></i>
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>

import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabber",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped lang="scss">
.main-tabber {
  z-index: 9;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);

  a {
    color: var(--color-text);
    &.router-link-exact-active {
       color: var(--color-high-text);
    }
  }
}
</style>