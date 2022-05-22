import {request} from './request';

// 用户登录
export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

// 用户注册
export function register(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}