import {request} from './request';

// 获取维修工信息
export function getMaintainersData() {
    return request({
        url: '/api/getMaintainersData',
    })
}