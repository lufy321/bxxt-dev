<template>
  <div class="home">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>首页</template>
    </nav-bar>
    <div class="home-body">
      <home-swiper class="swiper" :banners="banners" />
      <div class="list">
        <h3>维修工电话：</h3>
        <div class="tellist">
          <div class="tel" v-for="item in MaintainersData" :key="item">
            <div>
              <span>{{ item.name }}:</span>
              <span>{{ item.tel }}</span>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSwiper from "./ChildComps/HomeSwiper";
import { ref, reactive, toRefs, onMounted } from "vue";
import { getMaintainersData } from "network/public";
import { useStore } from "vuex";
import NavBar from "../../components/common/navbar/NavBar";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    NavBar,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      MaintainersData: {},
    });
    let banners = [
      `/api/assets/images/1.png`,
      `/api/assets/images/2.png`,
      `/api/assets/images/3.png`,
      `/api/assets/images/4.png`,
    ];

    onMounted(() => {
      getMaintainersData().then((res) => {
        data.MaintainersData = res.data;
      });
    });

    return {
      banners,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.home-body {
  margin-top: 45px;
  margin-bottom: 50px;
}
.tellist {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.tel {
  padding: 10px;
}
.list {
  margin-top: 5rem;;
}
</style>