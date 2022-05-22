import {request} from './request';

// 获取报修项下拉列表
export function getOption() {
    return request({
        url: '/my/getOption'
    })
}

// 获取材料项下拉列表
export function getMaterialOption() {
    return request({
        url: '/my/getMaterialOption'
    })
}

// 获取报修地点下拉列表
export function getSiteOption() {
    return request({
        url: '/my/getSiteOption'
    })
}