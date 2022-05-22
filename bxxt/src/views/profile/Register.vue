<template>
  <div class="register">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>新用户注册</template>
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
        :rules="[{required: true, message: '请填写工号'}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
          v-model="password_confirmation"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '两次密码不相同，请重新输入' }]"
      />
      <div class="su-button">
        <div class="link-login" @click="$router.push({path:'/login'})">
          已有账号，立即登录
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
import {register} from "network/user";
import {Notify, Toast} from "vant";
import {useStore} from 'vuex';

export default {
  name: "Register",
  components: {
    NavBar
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userinfo = reactive({
      username: "",
      password: "",
      password_confirmation: ""
    });
    const image = reactive({
      logo: `api/assets/images/logo.png`
    })
    const onSubmit = () => {
      if(userinfo.password !== userinfo.password_confirmation) {
        Notify("两次密码不一致，请重新输入!");
      } else {
        Toast.loading({
          duration: 0,
          message: '注册中...',
          forbidClick: true
        })
        register(userinfo).then((res) => {
          Toast.clear();
          if(res.status === 0) {
            Toast.success("注册成功");
            setTimeout(() => {
              router.push({path: "/login"});
            }, 1000);
          }else if (res.status === 1) {
            Notify(res);
          }
          console.log(res);
          userinfo.password = "";
          userinfo.password_confirmation = "";
        })
      }
    }

    return {
      ...toRefs(userinfo),
      ...toRefs(image),
      onSubmit,
      image
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