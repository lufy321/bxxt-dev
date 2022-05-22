<template>
  <div class="show">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>报修列表</template>
    </nav-bar>
    <div class="show-body">
      <van-search
        class="search"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>

      <van-tabs
        v-model:active="active"
        swipeable
        sticky
        color="#42b983"
        @change="Change"
      >
        <van-tab v-for="iName in itemName" :title="iName">
          <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
            <van-list
              class="van-list"
              v-model:loading="state.loading"
              :finished="state.finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <goods-list class="goods-list">
                <goods-list-item
                  v-for="item in goods[currentType].list"
                  :product="item"
                  :key="item"
                />
              </goods-list>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import GoodsListItem from "components/content/goods/GoodsListItem";
import NavBar from "components/common/navbar/NavBar";
import { getForm } from "network/form";
import { Toast } from "vant";
import { useStore } from "vuex";

export default {
  name: "Tab",
  components: {
    GoodsList,
    GoodsListItem,
    NavBar,
  },
  setup() {
    const store = useStore();
    const goods = reactive({
      new: { page: 1, list: [] },
      ing: { page: 1, list: [] },
      end: { page: 1, list: [] },
    });
    let totalPage = ref(0);
    let currentType = ref("new");
    const state = reactive({
      loading: true,
      finished: false,
      refreshing: false,
    });
    let active = ref(0);
    let itemName = ["新报修", "待维修", "已修好"];
    const Change = () => {
      console.log("change");
      let type = ["new", "ing", "end"];
      currentType.value = type[active.value];
      console.log(currentType.value);
      onRefresh();
    };

    const value = ref("");
    const onSearch = (val) => Toast(val);
    const onClickButton = () => Toast(value.value);

    onMounted(() => {
      console.log("onMounted");
      onRefresh();
    });

    const loadData = () => {
      console.log("3loadData");
      console.log(active.value);
      Toast.loading({
          duration: 0,
          message: '加载中...',
        })
      getForm(
        active.value,
        goods[currentType.value].page,
        store.state.user.username,
        store.state.user.identity
      ).then((res) => {
        Toast.clear()
        goods[currentType.value].list = goods[currentType.value].list.concat(
          res.data
        );
        state.loading = false;
        totalPage = res.sumpage;
        console.log("总页数" + totalPage);
        console.log("当前页" + goods[currentType.value].page);
        console.log("当前页数组长度" + res.data.length);
        if (goods[currentType.value].page >= totalPage) {
          state.finished = true;
        }
      });
    };

    const onLoad = () => {
      console.log("2onLoad");
      if (!state.refreshing && goods[currentType.value].page < totalPage) {
        goods[currentType.value].page += 1;
      }
      if (state.refreshing) {
        goods[currentType.value].list = [];
        state.refreshing = false;
      }
      loadData();
    };

    const onRefresh = () => {
      console.log("1onRefresh");
      state.refreshing = true;
      // 清空列表数据
      state.finished = true;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      goods[currentType.value].page = 1;
      onLoad();
    };

    return {
      state,
      onLoad,
      onRefresh,
      onClickButton,
      value,
      onSearch,
      active,
      Change,
      currentType,
      goods,
      totalPage,
      itemName,
    };
  },
};
</script>

<style scoped>
.show {
}

.show-body {
  height: calc(100vh - 45px);
}

.search {
  margin-top: 45px;
}

.goods-list {
  width: 97%;
  margin: 0 auto;
}

.van-list {
  margin-bottom: 50px;
}
</style>