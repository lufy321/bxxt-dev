import {request} from './request';

// 获取用户信息
export function getUserInfo() {
    return request({
        url: '/my/getUserInfo'
    })
}

// 用户登出
export function logOut() {
    return request({
        url: '/my/logOut',
        method: 'post'
    })
}