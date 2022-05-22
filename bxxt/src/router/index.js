import { createRouter, createWebHistory } from 'vue-router'

import {Notify} from "vant";
import store from "../store";
const Home = () => import('views/home/Home');
const Show = () => import('views/show/Show');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail');
const Login = () => import('views/profile/Login');
const Repairs = () => import('views/repairs/Repairs');
const Register = () => import('views/profile/Register');
const About = () => import('views/profile/About');

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '宿舍报修系统'
    }
  },
  {
    path: '/show',
    name: 'Show',
    component: Show,
    meta: {
      title: '报修列表',
      isAuthRequired: true
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '详情',
      isAuthRequired: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '我的',
      isAuthRequired: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/repairs',
    name: 'Repairs',
    component: Repairs,
    meta: {
      title: '报修',
      isAuthRequired: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册',
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们',
    }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if(to.meta.isAuthRequired && store.state.user.isLogin === false) {
    Notify('您还没有登录，请先登录')
    return next({path: '/login'});
  }else {
    next();
  }
  // 设置标题为路由的元数据的title
  document.title = to.meta.title;
})

export default router
