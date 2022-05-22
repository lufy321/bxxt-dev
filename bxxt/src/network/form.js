import {request} from './request';

// 新增报修
export function addForm(data) {
    return request({
        url:'/my/addForm',
        method: 'post',
        data
    })
}

// 根据状态查询表单
export function getForm(staus, page, username, identity) {
    return request({
        url: `/my/selectForm?staus=${staus}&page=${page}&username=${username}&identity=${identity}`,
    })
}

// 上传图片
export function upLoad(data) {
    return request({
        url: '/my/upLoad',
        method: 'post',
        data,
        headers:{
            "Content-Type": "multipart/form-data" // 设置完以后 传入的params对象就会时候用formdata传参的方式
        }
    })
}

// 根据ID获得详情
export function getDetail(id) {
    return request({
        url: '/my/goods/' + id
    })
}

// 接单状态变更
export function setStaus(staus, id) {
    return request({
        url: `/my/stausChange?staus=${staus}&id=${id}`
    })
}

// 更新报修
export function updateForm(data) {
    return request({
        url: '/my/updateForm',
        method: 'post',
        data
    })
}

// 更新接单时间
export function updateAcceptData(data) {
    return request({
        url: '/my/updateAcceptData',
        method: 'post',
        data
    })
}