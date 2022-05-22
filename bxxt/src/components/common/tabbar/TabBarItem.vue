<template>
  <div class="tab-bar-item">
    <div class="item-i">
      <slot name="item-i"></slot>
    </div>
    <div class="item-text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "TabBarItem",
  components: {

  }

}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item .item-i {
    height: 24px;
    margin-top: 5px;
    vertical-align: middle; /* 设置元素的垂直对齐方式，把此元素放置在父元素的中部 */
  }
</style>