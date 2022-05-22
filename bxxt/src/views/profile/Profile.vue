<template>
  <div>
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>个人中心</template>
    </nav-bar>

    <div class="use-body">
      <div class="user-info">
        <div class="info">
          <img src="/api/assets/images/favicon.ico" alt="">
          <div class="user-desc">
            <div>昵称：{{ user.username }}</div>
            <div>登录名：{{ user.username }}</div>
            <div class="name">个性签名：机会只留给有准备的人</div>
          </div>
        </div>
      </div>

      <ul class="user-list">
        <li class="van-hairline--bottom" @click="goTo('/about')">
          <span>关于我们</span>
          <van-icon  class="icon" name="arrow"/>
        </li>
      </ul>

      <div style="margin: 16px">
        <van-button @click="tologout" round block color="#44ba80">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {logOut} from "network/userInfo";
import {ref, reactive, toRefs, onMounted} from "vue";
import {useRouter} from 'vue-router';
import {Toast} from "vant";
import {useStore} from 'vuex';

export default {
  name: "Profile",
  components: {
    NavBar
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      user: {},
    })

    onMounted(() => {
      state.user = store.state.user
    })

    const tologout = () => {
      logOut().then(res => {
        if(res.status == '204') {
          Toast.success("退出成功");

          // 清除token window.localStroage
          localStorage.removeItem('token');

          store.commit('setIslogin', false);

          setTimeout(() => {
            router.push({path: '/login'});
          }, 500)
        }
      })
    }

    const goTo = (path, query) => {
      router.push({path, query: query || {}});
    }

    return {
      ...toRefs(state),
      goTo,
      tologout
    }
  }
}
</script>

<style scoped lang="scss">
  .use-body {
    margin: 60px 10px 0px;
    .info {
      display: flex;
      align-items: center;
      padding: 10px;
      background: linear-gradient(90deg, #31c7a7, #a1c7c7);
      border-radius: 5px;
      img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
      .user-desc {
        margin-left: 10px;
        color: #FFFFFF;
        font-size: 12px;
      }
    }
    .user-list {
      font-size: 14px;
      .van-hairline--bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
      }
    }
  }
</style>