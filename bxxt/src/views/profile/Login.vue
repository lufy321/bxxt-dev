<template>
  <div class="login">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>用户登录</template>
    </nav-bar>

    <div class="top-img">
      <van-image width="10rem" height="5rem" fit="contain" :src="logo"/>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="工号"
        label="工号"
        placeholder="请输入您的工号"
        :rules="[{ required: true, message: '请填写您的工号' }   ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />

      <div class="su-button">
        <div class="link-login" @click="$router.push({path:'/register'})">
          没有账号，立即注册
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit">
        提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {useRouter} from 'vue-router';
import {ref, reactive, toRefs} from 'vue';
import {Notify, Toast} from "vant";
import {login} from "network/user";
import {getUserInfo} from "network/userInfo";
import {useStore} from 'vuex';

export default {
  email: "Register",
  components: {
    NavBar
  },
  setup() {
    const router = useRouter();
    const store = useStore()
    const userinfo = reactive({
      username: "",
      password: "",
    });
    const image = reactive({
      logo: `/api/assets/images/logo.png`
    })
    console.log(image.logo);
    const onSubmit = () => {
      Toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })
      console.log(userinfo.username)
      login(userinfo).then(async res => {
        // 将token保存在本地window.localStorage setItem(key, value) getItem(key)
        window.localStorage.setItem('token', res.token);
        //获取用户信息保存至store中
        await getUserInfo().then(({data}) => {
          store.commit('setUserInfo', data)
        })
        // 在vuex islogin
        store.commit('setIslogin', true);
        console.log(res);
        Toast.clear();
        if (res.status == 0) {
          Toast.success(`登录成功,欢迎${store.state.user.identity == 0 ? `${store.state.user.username}管理员` : `${store.state.user.username}用户`}`);
          router.go(-1);
          userinfo.username = "";
          userinfo.password = "";
        }else{
          Toast.fail("登录失败");
        }
      })
    }

    return {
      ...toRefs(userinfo),
      ...toRefs(image),
      onSubmit,
    }
  }
}
</script>

<style scoped>
  .top-img {
    margin-top: 80px;
    text-align: center;
  }
  .su-button {
    margin: 16px;
  }
  .link-login {
    text-align: center;
    margin-bottom: 10px;
    color: var(--color-tint);
  }
</style>