<template>
  <div class="goods-item" @click="itemClick">
    <div class="goods-head">
<!--      <span>巡检</span>-->
      <span>单号：{{product.id}}</span>
    </div>
    <div class="goods-info">
      <div class="info-title"><span>报修项：</span><span>{{product.reportContent}}</span></div>
      <div class="info-title"><span>地点：</span><span>{{product.dormitory}}</span></div>
      <div class="info-title"><span>故障：</span><span>{{product.message}}</span></div>
    </div>
    <div class="goods-foot">
        <div>报修人：{{ product.name }}</div>
        <div>报修时间：{{formatTime(product.createTime)}}</div>
        <div v-if="product.staus > 0">接单人：{{ product.pickUser }}</div>
        <div v-if="product.staus > 0">维修时间：{{formatTime(product.acceptTime)}}-<spanv v-if="product.staus == 2">{{formatTime(product.endTime)}}</spanv></div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import moment from 'moment';

export default {
  name: "GoodsListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const router = useRouter();
    const itemClick = () => {
      router.push({path: '/detail', query: {id: props.product.id}})
    }

    const formatTime = (time) => {
      return moment(time).format("YYYY-MM-DD HH:mm");
    }

    return {
      itemClick,
      formatTime
    }
  }
}
</script>

<style scoped lang="scss">
  .goods-head {
    border-bottom: 1px solid #f8f9fa;
  }
  .goods-item {
    font-size: var(--van-cell-font-size);
    width: 98%;
    margin-bottom: 5px;
    background-color: white;
    border-radius: 3px;
    padding: 10px 10px;

    div {
      padding: 3px;
    }
  }

  .goods-foot {
    border-top: 1px solid #f8f9fa;
  }
</style>