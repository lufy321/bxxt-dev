import axios from "axios";
import store from "../store/index";
import {Notify, Toast} from "vant";
import router from "../router"

export function request(config) {
    const instance = axios.create({
        baseURL: '/api',
        // baseURL: process.env.VUE_APP_API_URL,
        // baseURL: 'http://nxbx.ejianlong.com:8086',
        withCredentials: true,
        timeout: 200000,
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一个接口需要认证才可以访问, 就在这块统一设置
        // 使用 JWT 认证：取出用户登录十寸的 token 放到请求头
        const token = window.localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token // Bearer 右边有一个空格
        }
        // 放行
        return config;
    },error => {

    })


    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
    }, err => {
        // 如果有需要授权才可以访问的接口，统一去login授权
        if(err.response.status === 401) {
            Toast.fail('请您先登录!')
            router.push({path: '/login'})
        }
        // 如果后端接口有错误提示消息，这里统一处理，显示错误信息
        // console.log(err)
        // 通过err.response响应数据里面的错误，拿到Object键里面的错误信息
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
    })

    return instance(config);
}